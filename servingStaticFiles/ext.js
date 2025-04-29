import express from 'express'
import { fileURLToPath } from 'url'
import path from 'path'

const app = express()

// app.get('/',(req,res) => {
//   res.send('<h1>Hello world</h1>')
// })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const staticDir = path.join(__dirname,'static')


app.use(express.static(staticDir))

app.use((req,res,next) => {
  res.status(404).sendFile(path.join(staticDir,'404.html'))
})

app.listen(5000,() => console.log('The server is running on port 5000')
)