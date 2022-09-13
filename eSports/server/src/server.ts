import express from "express";

const app = express();

app.listen(3333, () => console.log("server running...."))


app.get("/", (req, res) => res.send("hello word\n"))

