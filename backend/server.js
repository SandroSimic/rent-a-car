import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res) => {
  res.send('API is running')
})

app.listen(port, (req, res) => {
  console.log(`Server Running on port ${port}`);
});
