import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware to parse JSON
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));

app.use(cookieParser());

// Example route
app.get("/", (req, res) => {
    res.send("Hello from Chai Aur Backend!");
});

export default app;
