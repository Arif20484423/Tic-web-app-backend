const  express = require("express")
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/user.routes")


const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.use("/api/v1/users",userRouter)


module.exports = { app }    