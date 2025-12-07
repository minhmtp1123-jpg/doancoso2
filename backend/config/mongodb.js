import mongoose from "mongoose";

const conectDB = async () => {

    mongoose.connection.on("connected", () => {
        console.log("MongoDB connected successfully");
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`)


}

export default conectDB;