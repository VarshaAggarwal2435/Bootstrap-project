const express = require('express');
const {user,connectMongoDb} = require('../models/user');

const router = express.Router();

router.post("/login.html", saveData);







async function saveData(req, res) {
    const body = req.body;
    if(!body.emailId) {
        return res.status(400).json({error:"Info not provided"})
    }
    
    await user.create({
        name:body.name,
        emailId:body.emailId,
        phoneNo:body.phoneNo,
    });

    return res.json({email: body.emailId});
}

module.exports = router;