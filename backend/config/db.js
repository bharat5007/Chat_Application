const mongoose=require("mongoose");

const connectdb= async()=>{
    try{
        const conn=await mongoose.connect('mongodb+srv://bharat5008:bharat5008@bharat5008.futlwx4.mongodb.net/?retryWrites=true&w=majority&appName=bharat5008', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: true,
        });
        console.log(`MONGODB Connected: ${conn.connection.host}`);
    } catch(error){
        console.log(`Error: ${error}`);
        process.exit(1);
    }
};

module.exports=connectdb;