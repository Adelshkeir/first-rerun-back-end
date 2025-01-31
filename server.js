import express from "express";
import sequelize from "./database-connection.js";
import dotenv from "dotenv";

dotenv.config();
import cors from "cors";
import categoryRouter from "../first-rerun-back-end/routes/categoryRoute.js";
import productRouter from "./routes/productRoute.js";
import adminRouter from "./routes/adminRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.static("./"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*", // Replace with your frontend's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", adminRouter);

app.use(errorHandler);

// app.use(
//     cors({
//       origin: "*", // Replace with your frontend's URL
//       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//       credentials: true,
//     })
//   );

sequelize.sync({ force: false});
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
