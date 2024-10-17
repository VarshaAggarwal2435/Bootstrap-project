const express = require("express");
const path = require("path");
const userModel = require("./models/userModel");

const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.get("/", function(req, res){
    res.render("index");
})

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/log", async function(req, res){
    let user = await userModel.findOne({email:req.body.email});
    if(user)
        bcrypt.compare(req.body.password, user.password, function(err, result){
            if(result){
                let token = jwt.sign({email: user.email}, "secret");
                res.cookie("token", token);
                res.redirect("/quiz");
            }  
            else   
                res.send("Invalid Credentials");     
        })
    else
        return res.send("Invalid credentials");
});

app.get("/signup", function(req, res){
    res.render("signup");
});

app.post("/create", async function(req, res){
    let {email, password} = req.body;
    const emailValid = email.trim();
    const passwordValid = password.trim();
    if(!emailValid || !passwordValid) 
        return res.send("Please enter email and password")

    let user = await userModel.findOne({email});
    if(user)    
        return res.status(500).send("User Already exists");
    
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
            let createdUser = await userModel.create({
                email,
                password:hash
            });
            
            let token = jwt.sign({email}, "secret");
            res.cookie("token", token);
            res.send("Account Registered. You can login");
        })
    })
});

app.get("/quiz", function(req, res){
    res.render("quiz");
});

function isLoggedIn(req, res, next){
    if(req.cookies.token === "")
        res.redirect("/");
    else{
        let data = jwt.verify(req.cookies.token, "secret");
        req.user = data;
        next();
    }
}

app.listen(3000, function(){
    console.log("Quiz");
});
