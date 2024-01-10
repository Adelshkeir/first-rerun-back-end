import express from "express";
import sequelize from "./database-connection.js";
import passport from "passport";
import passportConfig from "./googleConfig/passport.js";
import session from "express-session";
import googleAuthRoute from "./routes/googleAuthRoute.js";
import orderroutes from "./routes/order.js"
import reviewRoutes from "./routes/reviewRoute.js";
import dotenv from "dotenv";

dotenv.config();

passportConfig(passport);
import cors from "cors";
import categoryRouter from "../first-rerun-back-end/routes/categoryRoute.js";
import productRouter from "./routes/productRoute.js";
import adminRouter from "./routes/adminRoute.js";
import adminGoogleRouter from "./routes/adminGoogleRoute.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(express.static("./"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Sessions
app.use(
  session({
    secret: "keyboard dog",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", adminRouter);
app.use("/", adminGoogleRouter);
app.use("/auth", googleAuthRoute);
app.use("/api", orderroutes);
app.use("/api/review", reviewRoutes);

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
