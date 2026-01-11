import { validationResult } from "express-validator";
import Notice from "../../models/Notice.js";

// 1. Create Notice (with Validation & Draft support)
export const createNotice = async (req, res) => {
  // ১. Validation Check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors
        .array()
        .map((err) => ({ field: err.path, message: err.msg })),
    });
  }

  try {
    const noticeData = { ...req.body };

    // ২. Cloudinary File Implementation
    if (req.file) {
      noticeData.attachment = req.file.path; // Cloudinary URL
    }

    const notice = new Notice(noticeData);
    await notice.save();

    res.status(201).json({
      success: true,
      message: `Notice ${
        notice.status === "Draft" ? "saved as Draft" : "Published"
      } successfully!`,
      data: notice,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Get All Notices (Active vs Draft filtering included)

export const getAllNotices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const { status } = req.query;
    const filter = status ? { status } : {};

    const totalNotices = await Notice.countDocuments(filter);
    const notices = await Notice.find(filter)
      .sort({ createdAt: -1 }) 
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: notices.length,
      pagination: {
        totalData: totalNotices,
        totalPages: Math.ceil(totalNotices / limit),
        currentPage: page,
        limit: limit,
        hasNextPage: page * limit < totalNotices,
        hasPrevPage: page > 1,
      },
      data: notices,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 3. View Single Notice
export const getSingleNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice)
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    res.status(400).json({ success: false, message: "Invalid ID format" });
  }
};

// 4. Update Status (Publish/Unpublish) & Notice Content
export const updateNotice = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedNotice)
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });

    res
      .status(200)
      .json({
        success: true,
        message: "Notice updated successfully",
        data: updatedNotice,
      });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 6. Delete Notice
export const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice)
      return res
        .status(404)
        .json({ success: false, message: "Notice not found" });
    res
      .status(200)
      .json({ success: true, message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};