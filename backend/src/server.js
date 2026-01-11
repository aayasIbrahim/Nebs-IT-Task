
import express from "express";
import noticeRoutes from "./routes/notice.route.js";
import path from "path";
;
import { connectDB } from "../lib/db.js";
import cors from "cors";

import { ENV } from "../lib/env.js";
const __dirname = path.resolve();
const app = express();

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());


//All routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "notice board is running 🚀",
  });
});



app.use("/api/notices", noticeRoutes);
const { PORT } = ENV;

app.listen(PORT, () => {
  connectDB();
  console.log("server is runing:" + PORT);
});
