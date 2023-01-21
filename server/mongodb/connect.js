import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set("strictQuery", true);

    mongoose
        .connect(url)
        .then(() => console.log("connected to mongo"))
        .catch((err) => console.log(`Failed to connect with error ${err}`));
};

export default connectDB;