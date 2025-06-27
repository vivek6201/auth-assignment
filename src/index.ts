import "dotenv/config"
import express from "express";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { v1 } from "./routes";
import { notFoundController } from "./controllers/common/notFoundController";

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/api/v1", v1);

app.use(notFoundController);

app.use(globalErrorHandler)

app.listen(port, () => {
    console.log("server is up at:", port);
})