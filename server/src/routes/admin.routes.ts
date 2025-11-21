import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middleware/auth";
import { getAdminSummary } from "../controllers/admin.controller";

const router = Router();

// GET /api/admin/summary
router.get("/summary", authenticate, authorizeAdmin, getAdminSummary);

export default router;
