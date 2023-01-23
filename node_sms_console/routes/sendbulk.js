import Router from "express-promise-router";

import { errorBatch, sendBulk, successfulBatch } from "../controllers/sendbulk.js";

const router = Router();


router.post('/', sendBulk);
router.get('/success/:bid', successfulBatch);
router.get('/error/:bid', errorBatch);

export default router;