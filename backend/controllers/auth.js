const usermodel=require("../models/usermodel");
const generateToken=require("../config/generatetokens");
const bcrypt = require("bcryptjs");
const { search } = require("../routes/userroutes");

const signup=async (req,res)=>{
    const {name, gmail, xpassword, pic, userid}=req.body;
    if(!name || !gmail || !xpassword || !userid) return res.status(400).json({msg: "Please Fill all the details"});
    
    const x=await usermodel.findOne({gmail: gmail});
    if(x) return res.status(500).json({msg: "User already exists"});
    
    const salt = await bcrypt.genSalt(8);
    const password = await bcrypt.hash(xpassword, salt);
    
    try {
        const y=await usermodel.create({name,gmail,password,pic,userid});
        // console.log("!");
        try {
            return res.status(200).json({
                _id: y._id,
                name: y.name,
                email: y.email,
                userid: y.userid,
                token: generateToken(y._id),
    
            })
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        return res.status(400).json({msg: "Failed to create a new user" + error});
    }

}

const login=async(req,res)=>{
    try {
        const {gmail,password}=req.body;
        if(!gmail || !password) return res.status(400).json({msg: "Please fill all the details"});
        
        const y=await usermodel.find({gmail: gmail});
        if(!y) return res.status(400).json({msg: "User does not exist"});
        
        const iscorrectpassword = await bcrypt.compare(password, y[0]?.password);
        
        if(!iscorrectpassword) return res.status(400).json({msg: "Incorrect Password"});
        return res.status(200).json({
            _id: y[0]._id,
            name: y[0].name,
            gmail: y[0].gmail,
            userid: y[0].userid,
            token: generateToken(y[0]._id),
        })
    } catch (error) {
        return res.status(400).json({msg: "Failed to login" + error});
    }
}

const searching=async(req,res)=>{
    const keyword= req.query.search?{
        $or: [
            {name: {$regex: req.query.search, $options: "i"}},
            {userid: {$regex: req.query.search, $options: "i"}},
        ]
    }:{};
    
    const users=await usermodel.find(keyword);
    // console.log(users);
    res.send(users);
}

module.exports={
    signup,
    login,
    searching,
}