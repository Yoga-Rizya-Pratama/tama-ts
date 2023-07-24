import multer from "multer";
import fs from 'fs';
import path from 'path';

// Define the relative path for the "images" folder in the root directory
const imagesFolderPath = path.join(__dirname, '..', 'images');

// Create the "images" folder if it doesn't exist
if (!fs.existsSync(imagesFolderPath)) {
    fs.mkdirSync(imagesFolderPath);
}

//Set up
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "-" + file.originalname);
    },
});

//Filter jenis image yang diizinkan
const fileFilter = (file: any, cb: any) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Membuat middleware untuk mengunggah file gambar
export const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
});