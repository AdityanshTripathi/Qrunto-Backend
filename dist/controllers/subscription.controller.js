"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionController = void 0;
const zod_1 = require("zod");
const subscription_service_1 = require("../services/subscription.service");
const subscriptionService = new subscription_service_1.SubscriptionService();
const CreateSubscriptionSchema = zod_1.z.object({
    planId: zod_1.z.string().uuid('Invalid plan ID format'),
});
class SubscriptionController {
    createPendingSubscription(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // 1. Check authentication
                if (!req.user) {
                    res.status(401).json({ error: 'Authentication required' });
                    return;
                }
                const restaurantId = req.user.restaurantId;
                if (!restaurantId) {
                    res.status(400).json({ error: 'No restaurant associated with this user session' });
                    return;
                }
                // 2. Validate input
                const validationResult = CreateSubscriptionSchema.safeParse(req.body);
                if (!validationResult.success) {
                    res.status(400).json({ errors: validationResult.error.flatten().fieldErrors });
                    return;
                }
                // 3. Call service
                const subscription = yield subscriptionService.createPendingSubscription(restaurantId, validationResult.data.planId);
                res.status(201).json({ subscription });
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.SubscriptionController = SubscriptionController;
//# sourceMappingURL=subscription.controller.js.map