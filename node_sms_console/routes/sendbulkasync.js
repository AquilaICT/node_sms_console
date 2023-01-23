import Router from "express-promise-router";

import {
    errorBatch,
    sendBulkAsync,
    successfulBatch
} from "../controllers/sendbulkasync.js";

const router = Router();


router.post('/', sendBulkAsync);
router.get('/success/:bid', successfulBatch);
router.get('/error/:bid', errorBatch);

export default router;