const express = require('express')
const connection = require('./config')
const AuthRouter = require('./Routes/Auth.route')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/auth",AuthRouter)
app.use("/products",AuthRouter)

app.listen(8080, async () => {
    try {
         await connection
         console.log('connection established')
    } catch (error) {
        console.log(error.message,"Error")
    }
  console.log('Example app listening on port 8080!')
})