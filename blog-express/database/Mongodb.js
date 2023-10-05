import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully...");
    } catch (error) {
        console.log(error.message);
    }
}

export default connect;