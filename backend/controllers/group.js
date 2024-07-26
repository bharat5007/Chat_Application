const groupmodel=require('../models/groupmodel')

const create=async (req,res)=>{

    const {name, user}=req.body;
    if(!name) res.status(400).json({msg: "Name is required"});
    if(user.length<3) res.status(400).json({msg: "Cannot create a group of less than 3 members"});
    try{
        // console.log(name);
        // console.log(user);
        try {
            const groupcreate= await groupmodel.create({
                name: name,
                members: user
            });
        } catch (error) {
            console.log(error);
        }
        // console.log("*&^*&^%$");

        return res.status(200).json({msg: "Group created successfully"});
    }
    catch(error){
        return res.status(400).json({msg: "Failed to create group"});
    }
}

const exit=async(req,user)=>{
    const {members, name}=req.body;
    try {
        const group=await groupmodel.update({name: name}, {$set:{members: members}});
        return res.status(200).json({msg: "kickout successful"});
    } catch (error) {
        return res.status(400).json({msg: "Unable to kickout"});
    }
}

module.exports={
    create,
    exit,
}