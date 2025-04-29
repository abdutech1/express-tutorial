import express from 'express'
import bodyParser from 'body-parser'
import usersRoute from './users.js'

//Custom meadleware

import { loggerMeadleware,authenticateMeadleware } from '../meadleware/meadlewares.js'

const app = express()
const PORT = 5000

app.use(bodyParser.json())

app.use('/api/users',loggerMeadleware,authenticateMeadleware,usersRoute)
app.listen(PORT,() => {
  console.log(`The server is running on port ${PORT}`);
})