import express from "express";
import cors from "cors";
import router from "./routes/events.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/events", router);

app.get("/", (_req, res) => {
  res.send("Welcome to my Express Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
