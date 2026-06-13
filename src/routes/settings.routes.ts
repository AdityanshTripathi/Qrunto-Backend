import { Router } from 'express';
import { SettingsController } from '../controllers/settings.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
const settingsController = new SettingsController();

// Require authentication for settings endpoints
router.use(authenticate);

router.get('/', (req, res) => settingsController.getSettings(req, res));
router.patch('/', (req, res) => settingsController.updateSettings(req, res));

export default router;
