import express from 'express';
import "dotenv/config";
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.route.js';
import noteRoutes from './routes/note.route.js';


const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true                
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

connectDB().then(() => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
})