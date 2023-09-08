require('dotenv').config()
require('express-async-errors')

const { log } = require('console')
const express = require('express')
const app = express()
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
const connectDB = require('./db/connect')
const routerCards = require('./routes/cards')

//Middleware
app.use(express.json())
app.use(express.static('./public'))
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1/', routerCards)

//Error handler
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log('Server is listening on port 3000...'))
  } catch (error) {
    console.log(error);
  }
}




start()