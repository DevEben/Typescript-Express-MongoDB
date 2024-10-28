import express, { Request, Response, NextFunction } from "express";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, "./uploaded");
    },

    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else if (file.mimetype === "application/pdf" || file.mimetype === "application/msword" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        cb(null, true);
    } else {
        cb(new Error("Filetype not supported. Only images, PDF, and DOC/DOCX files are allowed"), false);
    }
};

const fileSize = 1024 * 1024 * 4; // 4 MB file size limit

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: fileSize }
});

export { upload };
