// uploadMiddleware.ts
import multer from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes en formato JPEG o PNG.'));
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 } // Límite de 2 MB
});

// Middleware sin validación de VirusTotal
const validateFileUpload = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No se ha subido ningún archivo' });
    }

    // Omitir la validación de VirusTotal y continuar al siguiente middleware
    next();
};

export { upload, validateFileUpload };
