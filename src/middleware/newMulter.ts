import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        // Use environment variable for upload path, with fallback to '/tmp'
        const uploadPath = process.env.UPLOAD_PATH || '/tmp';
        cb(null, uploadPath);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        // Use the original filename for saving uploaded file
        cb(null, file.originalname);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
    // Allow images, PDF, and DOC/DOCX file types
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "application/msword" ||
        file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
        cb(null, true);
    } else {
        // Reject unsupported file types
        cb(new Error("Filetype not supported. Only images, PDF, and DOC/DOCX files are allowed"), false);
    }
};

// Set file size limit to 4 MB
const fileSizeLimit = 1024 * 1024 * 4;

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: fileSizeLimit }
});

export { upload };