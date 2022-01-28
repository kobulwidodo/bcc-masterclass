import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js'
import courseRoutes from './routes/courseRoutes.js'

const app = express();

app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

const dbURI = 'mongodb://localhost/masterclass';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log("DB Connection Success"))
  .catch((err) => console.log(err));

app.use("/user", authRoutes);
app.use("/course", courseRoutes);

const server = app.listen(port, () =>
	console.log(`Server is running on port ${port}`)
);

