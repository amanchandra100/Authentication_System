import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import cors from "cors";

// configure env
dotenv.config();

//database config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Wellcome to Ecommerce</h1>");
});

//port
const PORT = process.env.PORT;

//run listen
app.listen(PORT, () => {
  console.log(`sever run on ${PORT}`.bgCyan.white);
});
