"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const settings_controller_1 = require("../controllers/settings.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const settingsController = new settings_controller_1.SettingsController();
// Require authentication for settings endpoints
router.use(auth_middleware_1.authenticate);
router.get('/', (req, res) => settingsController.getSettings(req, res));
router.patch('/', (req, res) => settingsController.updateSettings(req, res));
exports.default = router;
//# sourceMappingURL=settings.routes.js.map