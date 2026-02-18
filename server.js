const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");
const requestLogger = require("./middlewares/loggerMiddleware");
const authMiddleware = require("./middlewares/authMiddleware");
const errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware");
const CustomError = require('./Utils/CustomError');

dotenv.config();
connectDB();
const app = express();
// Use the middleware
app.use(requestLogger);

app.use(cors());
app.use(express.json());

//API endport
app.use('/api/products', authMiddleware, productRoutes);


//Hello World route
app.get('/', (req, res) => {
  res.send('Hello World');
});



app.use((req, res, next) =>{
  // const err = new Error(`Can't find ${req.originalUrl} on the server`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);
  const err = new CustomError(`Can't find ${req.originalUrl} on the server`, 404);
  next(err);
});

app.use(errorHandlingMiddleware);


//listening to the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server is running on: http://localhost:${PORT}`);
});