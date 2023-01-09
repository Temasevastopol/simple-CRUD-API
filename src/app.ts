import express from 'express';
import cors from 'cors'
import users from './category/router';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())
app.use(cors());
app.use('/api/users', users);

app.listen(3000, ()=> console.log('Server started on 3000'));
