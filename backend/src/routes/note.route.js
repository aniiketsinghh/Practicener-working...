import express from 'express';
const router = express.Router();
import { protectRoute } from '../middleware/auth.middleware.js';
import { getNotes, createNote, updateNote, deleteNote} from '../controllers/note.controller.js';

router.use(protectRoute);
router.get('/', getNotes);
router.post('/create', createNote);
router.put('/update/:id', updateNote);
router.delete('/delete/:id', deleteNote);

export default router;