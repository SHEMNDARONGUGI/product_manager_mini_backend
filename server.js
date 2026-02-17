const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const requestLogger = require("./middlewares/loggerMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config();
connectDB();
const app = express();
// Use the middleware
app.use(requestLogger);

app.use(cors());
app.use(express.json());

//Hello World route
app.get('/', (req, res) => {
  res.send('Hello World');
});

//API endport
app.use('/api/products', authMiddleware, productRoutes);

//listening to the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server is running on: http://localhost:${PORT}`);
});