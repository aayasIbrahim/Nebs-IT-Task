import express from "express";
import { body } from "express-validator";
import multer from 'multer';
const upload = multer()
const router = express.Router();


import {
  createNotice,
  getAllNotices,
  getSingleNotice,
  updateNotice,
  deleteNotice,
  updateNoticeStatusOnly
} from "../controllers/notice.controller.js";

// Validation Rules Middleware
const noticeValidation = [
  body("noticeTitle")
    .notEmpty()
    .withMessage("Notice title is required")
    .isLength({ min: 5 })
    .withMessage("Title must be 5+ chars"),
    body("noticeDescription")
    .notEmpty()
    .withMessage("Description  is required")
    .isLength({ min: 5 })
    .withMessage("Description must be 5+ chars"),
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
router.post("/",upload.single("attachment"), noticeValidation, createNotice);

// Get all notices (Supports query: ?status=Published)
router.get("/", getAllNotices);

// View single notice
router.get("/:id", getSingleNotice);
// এটি মূল আপডেট রাউটের উপরে দিন যাতে ভ্যালিডেশন ঝামেলা না করে
router.patch("/:id/status", updateNoticeStatusOnly);

// Update notice (Publish/Unpublish/Content)
router.put("/:id",upload.single("attachment"), noticeValidation, updateNotice);

// Delete notice
router.delete("/:id", deleteNotice);

export default router;