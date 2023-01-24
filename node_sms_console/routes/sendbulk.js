import Router from "express-promise-router";

import { errorBatch, successfulBatch } from "../controllers/sendbulk.js";

const router = Router();


router.get('/success/:bid', successfulBatch);
router.get('/error/:bid', errorBatch);

export default router;