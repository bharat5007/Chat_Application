const jwt= require("jsonwebtoken");

const generateToken=(id)=>{
    return jwt.sign({id},"lol",{
        expiresIn: "30d",
    });
}

module.exports=generateToken;