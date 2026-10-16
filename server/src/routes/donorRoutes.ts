import { Router } from 'express';
import {
  registerDonor,
  getDonors,
  updateDonorStatus,
  deleteDonor
} from '../controllers/donorController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = Router();

// Public route: Students register themselves
router.post('/register', registerDonor);

// Protected routes: Only Admin can search, view, update, delete donors
router.get('/', protectAdmin, getDonors);
router.patch('/:id/status', protectAdmin, updateDonorStatus);
router.delete('/:id', protectAdmin, deleteDonor);

export default router;
