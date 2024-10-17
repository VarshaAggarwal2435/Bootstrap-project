const mongoose = require("mongoose");

mongoose
.connect("mongodb://127.0.0.1:27017/Students")
.then(function(){
    console.log("Connected");
})
.catch(function(err){
    console.log(err)
})

const userSchema = mongoose.Schema({
    email:String, 
    password: String,    
});

module.exports = mongoose.model("user", userSchema);
