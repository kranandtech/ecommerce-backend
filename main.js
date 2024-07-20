require("dotenv").config();
const express = require('express');
require("./config/db.js");
const cors = require("cors");
const authRouter = require("./routes/authRoutes.js");
const app = express();
app.use(express.json());
app.use(cors({origin: true}));
app.use(`/api/v1/auth`,authRouter);
app.listen(process.env.PORT,()=>{
    console.log(`listening on port: ${process.env.PORT}`);
  });
app.get('/', (req, res) => {
 res.send("ok");

});