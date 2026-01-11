import express from "express";
import { body } from "express-validator";
const router = express.Router();

import {
  createNotice,
  getAllNotices,
  getSingleNotice,
  updateNotice,
  deleteNotice,
} from "../controllers/notice.controller.js";

// Validation Rules Middleware
const noticeValidation = [
  body("noticeTitle")
    .notEmpty()
    .withMessage("Notice title is required")
    .isLength({ min: 5 })
    .withMessage("Title must be 5+ chars"),
  body("targetDept").notEmpty().withMessage("Target department is required"),
  body("noticeType")
    .isArray({ min: 1 })
    .withMessage("At least one notice type is required"),
  body("publishDate").notEmpty().withMessage("Publish date is required"),
  body("status")
    .optional()
    .isIn(["Published", "Draft", "Unpublished"])
    .withMessage("Invalid status value"),
];

// --- Routes ---

// Create a notice
router.post("/", noticeValidation, createNotice);

// Get all notices (Supports query: ?status=Published)
router.get("/", getAllNotices);

// View single notice
router.get("/:id", getSingleNotice);

// Update notice (Publish/Unpublish/Content)
router.put("/:id", noticeValidation, updateNotice);

// Delete notice
router.delete("/:id", deleteNotice);

export default router;