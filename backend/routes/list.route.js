import express from 'express';
import { complete, createList, deleteList, getAllList, onetask, updateTask } from '../controllers/list.controller.js';

const router = express.Router();

router.post("/createList",createList) ;
router.get("/getAllList/:email",getAllList) ;
router.get('/onetask/:id',onetask);
router.put('/updateTask/:id',updateTask);
router.put('/complete/:id',complete);
router.delete('/deleteList/:id',deleteList);



export default router;