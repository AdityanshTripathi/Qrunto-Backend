import { Request, Response } from 'express';
import { z } from 'zod';
import { SubscriptionService } from '../services/subscription.service';

const subscriptionService = new SubscriptionService();

const CreateSubscriptionSchema = z.object({
  planId: z.string().uuid('Invalid plan ID format'),
});

export class SubscriptionController {
  async createPendingSubscription(req: Request, res: Response): Promise<void> {
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
      const subscription = await subscriptionService.createPendingSubscription(
        restaurantId,
        validationResult.data.planId
      );

      res.status(201).json({ subscription });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async getActiveSubscription(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
      }

      const restaurantId = req.user.restaurantId;
      if (!restaurantId) {
        res.status(400).json({ error: 'No restaurant associated with this user session' });
        return;
      }

      const subscription = await subscriptionService.getActiveSubscription(restaurantId);
      res.status(200).json({ subscription });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
