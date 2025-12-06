import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

/* app.use("/clipboard", clipboardRouter); */


app.listen(4000, () => {
  console.log("API running at http://localhost:4000");
});