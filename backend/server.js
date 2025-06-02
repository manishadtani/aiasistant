import app from "./src/app.js";
import dotenv from 'dotenv'
dotenv.config()

import connect from "./src/db/db.js";
connect()


const port = process.env.PORT || 5000



app.listen(port, () => {
    console.log("Server is running on given port")
})