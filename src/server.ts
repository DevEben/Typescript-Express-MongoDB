import "./config/dbConfig";
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import multer from "multer";

import userRouter from "./routers/userRouter";

const app = express();

const corsOptions = {
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
};

// Middleware for CORS
app.use(cors(corsOptions));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

// Define routes
app.get('/', (req: Request, res: Response) => {
    res.send("Welcome to my first typescript project API 🎉🎉🎉");
});

// Routes
app.use('/api/v1', userRouter);


// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof SyntaxError && "status" in err && (err as any).status === 400 && "body" in err) {
        res.status(400).json({ error: 'Invalid JSON' });
    } else if (err instanceof multer.MulterError) {
        // Multer-specific error
        res.status(400).json({ error: `Multer Error: ${err.message}` });
    } else {
        console.error('Internal Server Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
        next()
    }
});
  


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server up and running on port: ${port} 🎉🎉🎉`);
});