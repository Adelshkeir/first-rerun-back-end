import express from "express"
import sequelize from "./database-connection.js";
import dotenv from 'dotenv'

dotenv.config()
import cors from 'cors'

const app = express()
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// app.use(
//     cors({
//       origin: "*", // Replace with your frontend's URL
//       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//       credentials: true,
//     })
//   );


app.use("/upload", express.static('upload'))





sequelize.sync({ force:false });

app.listen(4000,()=>{

    console.log("connected")
})