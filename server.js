import express from "express"
import sequelize from './database-connection.js'
import dotenv from 'dotenv';
import cors from 'cors';
import reviewRoutes from './routes/reviewRoute.js'
import productRoutes from './routes/productRoute.js';
import categoryRoutes from './routes/categoryRoute.js'; 
// import feedbackRoutes from './routes/feedbackRoutes.js';
import adminRoutes from './routes/Admin.js';
dotenv.config();
const app = express()




// app.use(
//     cors({
//       origin: "*", // Replace with your frontend's URL
//       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//       credentials: true,
//     })
//   );


app.use("/upload", express.static('upload'))

const PORT = process.env.PORT || 8090;

sequelize.sync()   


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

app.get('/',(req,res)=>{
 res.send("hello world")
})

app.use('/api/reviews', reviewRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/categories', categoryRoutes); 
// app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/admins', adminRoutes);
app.use(express.static('uploads'));

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });
  