import Router from "express-promise-router";

import { errorBatch, sendbulklite, successfulBatch } from "../controllers/sendbulklite.js";

const router = Router();


router.post('/', sendbulklite);
router.get('/success', successfulBatch);
router.get('/error', errorBatch);

export default router;