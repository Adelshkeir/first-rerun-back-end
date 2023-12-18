import express from "express"
import adminRoutes from './routes/Admin.js';
import sequelize from './database-connection.js'
const app = express()

app.use(express.json());

sequelize.sync()   

// app.use(
//     cors({
//       origin: "*", // Replace with your frontend's URL
//       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//       credentials: true,
//     })
//   );


app.use("/upload", express.static('upload'))


app.use('/api/admins', adminRoutes);




app.listen(4000,()=>{

    console.log("connected")
})