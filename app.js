import express from "express"
import cookieParser  from "cookie-parser"
import userRouter from "./routes/user.routes.js"
import { authenticateUser } from "./middlewares/auth.middleware.js"
import trials from "./routes/trials.route.js"
import path from "node:path"
export const app = express()
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from "cors"
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.set('view engine',"ejs")



app.set("views",path.join(__dirname,"/public/views"))




app.use("/api/v1/users",userRouter)
app.use("/api/v1/trials",trials)


