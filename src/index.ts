import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/MongodbConnect";
import userRouter from "./routes/userRouter";
import loginRouter from "./routes/loginRouter";
import aasanaRouter from "./routes/aasanaRouter";
import asanaDetailsRouter from "./routes/AasanaDetailsRouter";
import UserVariationAasanaRouter from "./routes/UserVariationRouter";
import MakeVariationRouter from "./routes/MakeVariationRouter";
import AlternativeAsanaRouter from "./routes/AlternativeAsanaRouter";
import UploadImgRouter from "./routes/UploadImgRouter";

dotenv.config();
const app = express();
const PORT = 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "https://yoga-application-4nyz.onrender.com",
  "http://localhost:3000",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Hello TypeScript + Node.js!" });
});

app.use("/api/users", userRouter);
app.use("/api/auth", loginRouter);
app.use("/api/aasanas_name", aasanaRouter);
app.use("/api/asanadetails", asanaDetailsRouter);
app.use("/api/uservariations", UserVariationAasanaRouter);
app.use("/api/makevariations", MakeVariationRouter);
app.use("/api/alternativeasana", AlternativeAsanaRouter);

app.use("/api/upload", UploadImgRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
