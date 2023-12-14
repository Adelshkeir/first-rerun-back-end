import express from "express"

const app = express()

app.use(express.json());



// app.use(
//     cors({
//       origin: "*", // Replace with your frontend's URL
//       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//       credentials: true,
//     })
//   );


app.use("/upload", express.static('upload'))







app.listen(4000,()=>{

    console.log("connected")
})