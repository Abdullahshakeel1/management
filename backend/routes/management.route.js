import { Router } from "express";
import { deleteManagement, getAllManagement, managementLogin, managementLogout, managementSignUp, updateManagement } from "../auth/management.auth.js";
import { isAuthenticate } from "../middleware/management.middleware.js";
export const manageRoute=Router();
manageRoute.post('/login',managementLogin)
manageRoute.post('/signup',managementSignUp)
manageRoute.post('/managementLogout',managementLogout)
manageRoute.get('/getAllManagement', getAllManagement)
manageRoute.put('/updateManagement/:id', updateManagement)
manageRoute.delete('/deleteManagement/:id', deleteManagement)

 