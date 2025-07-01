import express from "express";
import "dotenv/config";
import loginRtouter from "./routes/login.js";

const app = express();

app.use("/login", loginRtouter);

app.listen(3000);
