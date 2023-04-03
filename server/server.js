// import express from 'express'
// import * as dotenv from 'dotenv'
// import cors from 'cors'
const cors = require('cors')
const { Configuration, OpenAIApi } = require('openai');
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
dotenv.config()



const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);



app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from Chatgpt Backend!'
  })
})

app.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.json({
      message: response.data.choices[0].text
    })

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))