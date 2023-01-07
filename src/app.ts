import express from 'express';

const app = express();

app.get('/', (req, response) => {
    response.send('Hello world');
})
app.listen(3000, ()=> console.log('Server started on 3000'));
