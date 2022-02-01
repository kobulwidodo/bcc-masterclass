const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    return res.json({message: "hello"});
})

app.listen(port, () => {
    console.log(`app running at port ${port}`);
})