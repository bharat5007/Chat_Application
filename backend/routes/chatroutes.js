const express=require("express");
const {users, newchat, newmessage, allmessage}=require('../controllers/message');
const {protect}=require('../middlewares/authmiddleware')

const router=express.Router();

router.get('/users',protect,users);
router.get('/newchat',protect,newchat);
router.get('/message',protect,newmessage);
router.get('/allmessage',protect,allmessage);

module.exports=router;