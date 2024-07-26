const express=require("express");
const {create,exit}=require("../controllers/group");

const router=express.Router();

router.post('/create',create);
router.post('/exit',exit);

module.exports=router;