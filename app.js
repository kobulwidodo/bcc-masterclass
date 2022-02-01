const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const userRouter = require('./api/user/user.router');
const instructorRouter = require('./api/instructor/instructor.router');
const adminRouter = require('./api/admin/admin.router');

app.get('/', (req, res) => {
    return res.json("its works!!");
})

app.use('/user', userRouter);
app.use('/instructor', instructorRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
    console.log(`app running at port ${port}`);
})