const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 3080


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: "org-tevADdiGL1FSGDODGtWanucQ",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors())


app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 200,
        temperature: 0.5,
    });
    res.json({
        message: response.data.choices[0].text
    })
})
app.listen(port, () => {
    console.log(`App started at port ${port}`);
})