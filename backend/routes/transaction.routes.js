import express from 'express';
import multer from 'multer';
import {
    getTransactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    uploadReceipt
} from'../controllers/transaction.controller.js';
import {protect} from '../middleware/auth.middleware.js';
// const router=express.Router();

//configure multer for file upload
 const upload=multer({
    dest:'uploads/',
    limits:{fileSize:5*1024*1024}, //5mb limit
    fileFilter:(req,file,cb)=>{
        console.log('uploaded file mimetype:',file.mimetype);
        console.log('uploaded file name',file.originalname);
        const allowedMimeTypes=['image/jpeg','image/jpg','image/png','image/webp','application/pdf'];
        if(allowedMimeTypes.includes(file.mimetype)){
            return cb(null,true);
        }
        else{
            cb(new Error(`file type not allowed. Recieved:${file.mimetype}. Only images(JPEG,WEBP,PNG) and PDFs are allowed`));
        } 
    }
 });
    // router.use(protect);


    router.route('/')
    .get(getTransactions)
    .get(createTransaction);

    router.route('/:{id}')
    .get(getTransaction)
    .put(updateTransaction)
    .delete(deleteTransaction);

    router.post('/:id/receipt',upload.single('receipt'),uploadReceipt);
    export default router;
