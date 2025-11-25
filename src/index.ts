import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/MongodbConnect";
import userRouter from "./routes/userRouter";
import loginRouter from "./routes/loginRouter";
import cors from "cors";
import cookieParser from "cookie-parser";

import aasanaRouter from "./routes/aasanaRouter";
import asanaDetailsRouter from "./routes/AasanaDetailsRouter";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5137",
    credentials: true,
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
