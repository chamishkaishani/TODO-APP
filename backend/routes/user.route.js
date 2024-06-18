  import express from 'express';
import {  deleteUser, test,  updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


  const router = express.Router();

  router.get('/test',test); 

  router.post('/updateuser/:id',verifyToken,updateUser); 
  router.delete('/deleteuser/:id',verifyToken,deleteUser); 



    export default router;
