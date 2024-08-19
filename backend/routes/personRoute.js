import { Router } from "express";
import { addPerson, delPerson, login, personAllData, personType, personUpdate, singlePerson } from "../auth/personAuth.js";
import passport from '../middleware/person_middleware.js'
import express from 'express';
import { jwtMiddleWarePerson } from "../middleware/jwtMiddleware.js";
const app = express();
app.use(passport.initialize());
const auth = passport.authenticate('local', { session: false });
const router = Router();

router.post('/',addPerson);
router.post('/login',jwtMiddleWarePerson, login);
router.get('/', personAllData);

router.get("/:id",singlePerson );

router.put("/:id",personUpdate);
router.delete('/:id', delPerson);
router.get('/personType/:worktype', personType)

export default router;