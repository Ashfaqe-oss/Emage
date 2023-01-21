import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const port = process.env.PORT || 5000;

app.use("/v1/post", postRoutes);
app.use("/v1/ai", aiRoutes);

app.get("/", (req, res) => {
    res.status(200).send({
        message: "Hello from Dall - E_Image",
    });
});

const startServer = async() => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(port, () => {
            console.log("listening on port " + port);
        });
    } catch (err) {
        console.log(err);
    }
};

startServer();