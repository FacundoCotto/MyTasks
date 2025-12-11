import { requireAdmin } from './../core/middlewares/admin.middleware';
import { AdminService } from '../modules/admin/services/admin.service';
import { AdminRepository } from './../modules/admin/repositories/admin.repository';
import { Router } from "express";
import { AdminController } from '../modules/admin/controllers/admin.controller';
import { validate } from '../core/middlewares/validate.middleware';
import { registerSchema } from '../modules/auth/schemas/auth.schema';
import { editUserSchema } from '../modules/admin/schemas/admin.schema';
import { ADMIN_ROUTES } from '../config/paths';


const router = Router();

const adminRepository = new AdminRepository();
const adminService = new AdminService(adminRepository);
const adminController = new AdminController(adminService);

router.post(ADMIN_ROUTES.createUser, requireAdmin, validate(registerSchema), adminController.createUser);

router.get(ADMIN_ROUTES.getUsers, requireAdmin, adminController.getAllUsers);

router.get(ADMIN_ROUTES.getUser, requireAdmin, adminController.getUserById);

router.put(ADMIN_ROUTES.updateUser, requireAdmin, validate(editUserSchema),  adminController.updateUser);

router.delete(ADMIN_ROUTES.deleteUser, requireAdmin, adminController.deleteUser);

export default router;