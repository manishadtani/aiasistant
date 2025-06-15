import express from 'express'
const app = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routers/auth.routes.js'

app.use(express.json())
app.use(cookieParser())



app.use(cors({
    origin: "http://localhost:5173", // Correct for your frontend
    credentials: true,
}));


app.use("/api/auth", authRouter)

export default app;