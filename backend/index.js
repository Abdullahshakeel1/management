import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./connection/db_connection.js";
import cors from 'cors';
import bodyParser from "body-parser";
import personRoute from "./routes/personRoute.js";
import { manageRoute } from "./routes/management.route.js";
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/person', personRoute);
app.use('/management', manageRoute);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});
app.use((err,req,res,next)=>{
  const statuscode= err.statuscode||400;
  const message= err.message||"Server error"
  res.status(statuscode).json({
    success: false,
    statuscode,
    message
  })
})