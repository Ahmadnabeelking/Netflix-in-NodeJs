import express from 'express'
import dotenv from 'dotenv'
import conntDB from './DB/connection.js';
import * as router from './src/component/index.router.js'
dotenv.config({path:'./config/.env'});
conntDB();
const app = express()
app.use(express.json());
const port = 3000
const URL = process.env.URl;

app.use(`${URL}auth`,router.authRouter);
app.use(`${URL}movies`,router.moviesRouter);
app.use(`${URL}genre`,router.genreRouter);
app.use(`${URL}user`,router.userRouter);

app.use('*',(req,res)=>{
    res.status(404).json({message:'page not found'});
})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))