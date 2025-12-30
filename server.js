import express from 'express'
import connectToDB from './db.js'
import dotenv from 'dotenv';
import UserRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express()
const PORT = process.env.PORT || 3000

// Trust proxy (REQUIRED for cookies on Render/Vercel)
app.set("trust proxy", 1);

// 1) Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS must be implemented in server.js, not in auth.middleware.js.
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
/////////////////////////////////////////


// 2) Function call to connect to DB
connectToDB();

// 3) To use product routes we have to MOUNT the router file.
app.use('/api/auth', UserRoutes)

app.listen(PORT, () => {
    console.log(`Server app listening on port ${PORT}`)
})
