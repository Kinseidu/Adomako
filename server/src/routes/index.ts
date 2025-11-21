import { Router } from "express";
import contactRoutes from "./contact.routes";
import contactInfoRoutes from "./contact-info.routes";
import newsletterRoutes from "./newsletter.routes";
import newsRoutes from "./news.routes";
import programRoutes from "./program.routes";
import authRoutes from "./auth.routes";
import healthRoutes from "./health.routes";
import adminRoutes from "./admin.routes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/contact", contactRoutes);
router.use("/contact-info", contactInfoRoutes);
router.use("/newsletter", newsletterRoutes);
router.use("/news", newsRoutes);
router.use("/programs", programRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);

export default router;

