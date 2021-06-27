const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const helmet = require('helmet');
//express middlewares

app.use(express.json());
app.use(helmet());

//custom routers 
//importing account router
const accountRouter = require('./src/routers/accountRouter.js');

//importing account service router
const serviceRouter = require('./src/routers/serviceRouter.js');


app.get('/api/account/test',(req,res) => {

	return res.json({mssg:'hello world'})
})
//including custom routers

app.use('/api/account/service',serviceRouter);
app.use('/api/account',accountRouter);


//starting app

app.listen(PORT,() => console.log(`[Server] started on port ${PORT}`));
