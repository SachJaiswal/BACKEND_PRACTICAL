import express from "express";

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get("/", (req, res) => {
    res.send("Hello from Chai Aur Backend!");
});

export default app;
