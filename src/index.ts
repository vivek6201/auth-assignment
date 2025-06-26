import "dotenv/config"
import express from "express";
import { v1 } from "./routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use("api/v1", v1.default)

app.use(globalErrorHandler)

app.listen(port, () => {
    console.log("server is up at:", port);
})