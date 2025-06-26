import "dotenv/config"
import express from "express";

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use()

app.listen(port, () => {
    console.log("server is up at:", port);
})