import express from 'express'
const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("My name is manish")
})

export default app;