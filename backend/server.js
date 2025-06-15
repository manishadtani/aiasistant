import app from "./src/app.js";
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 5000
import connect from "./src/db/db.js";
connect()

// src/app.js


app.listen(port, () => {
    console.log(`Server is running on given port ${port}`)
})