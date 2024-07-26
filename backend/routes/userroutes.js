const express=require("express");
const {signup,login,searching}=require("../controllers/auth");

const router=express.Router();

router.post('/signin',signup)
router.post('/login',login)
router.get('/',searching)

module.exports=router;