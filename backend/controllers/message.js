const groupmodel=require('../models/groupmodel')
const usermodel=require('../models/usermodel')
const chatmodel=require('../models/chatmodel')
const Conservation=require('../models/conversationmodel');
const {getReceiverSocketId}= require('../socket/socket');

const sortByUpdatedAt = (arr) => {
    return arr.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
  };

const users = async (req, res) => {
    const xuser = req.user;
    try {
        // console.log(xuser);
        const x= await Conservation.find({ participants: xuser._id }).populate('messages').populate('participants')
        const y= await groupmodel.find({ members: xuser._id }).populate('messages').populate('members')
        
        let z = [...x, ...y];
        // console.log(z);
        const sortedDataDescending = sortByUpdatedAt(z);
        // console.log(sortedDataDescending);
        return res.status(200).send(sortedDataDescending);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Failed to fetch user data" });
    }
}

const newchat=async(req,res)=>{
    const xuser= req.user;
    const userid=req.query.userid;

    const x = await Conservation.find({ participants: { $all: [xuser._id, userid] } }).populate('messages');

    try {
        const z=[...x];
        // console.log("!!!!!!");
        // console.log(z);
        if(z.length===0){
            const a = await Conservation.create({ participants: [xuser._id, userid] });
            return res.status(200).send(a);
        }
        return res.status(200).send(z[0]);
    } catch (error) {
        return res.status(400).send(error);
    }
}

const newmessage=async(req,res)=>{
    const message=req.query.message;
    const sender=req.query.senderid;
    const receiver=req.query.receiverid;
    const a=req.query.a;

    const newMessage = await chatmodel.create({
        sender: sender,
        reciever: receiver,
        message,
    });

        const conversation = await Conservation.findOneAndUpdate(
            { participants: { $all: [sender, receiver] } },
            { $push: { messages: newMessage._id } },
            { new: true }
        );

        return res.status(200).send(newMessage);
}

const allmessage=async(req,res)=>{
    const sender=req.query.senderid;
    const receiver=req.query.receiverid;
    const a=req.query.a;

    const x = await Conservation.find({ participants: { $all: [sender, receiver] } }).populate('messages')

    try {
        const sortedDataDescending = sortByUpdatedAt(x);
        return res.status(200).send(sortedDataDescending)

    } catch (error) {
        return res.status(400).send(error);
    }
}

module.exports={
    users,
    newchat,
    newmessage,
    allmessage
}