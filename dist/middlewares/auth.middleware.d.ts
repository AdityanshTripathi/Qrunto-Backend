import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
export interface DecodedUser {
    id: string;
    email: string;
    role: UserRole;
    restaurantId?: string;
}
export declare const authenticate: (req: Request, res: Response, next: NextFunction) => void;
export declare const requireRoles: (roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map