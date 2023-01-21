import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

const app = express();

dotenv.config();

const router = express.Router();


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.status(200).send({ message: 'This is Dall-E !' })
})

router.route('/').post(async(req, res) => {
    try {
        const { prompt } = req.body;

        const dalleResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024', //look into later
            response_format: 'b64_json',
        })

        const image = dalleResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Something went wrong' + err })
    }
})

export default router;