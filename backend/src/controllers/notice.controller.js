import { validationResult } from "express-validator";
import Notice from "../../models/Notice.js";

// 1. Create Notice (with Validation & Draft support)
export const createNotice = async (req, res) => {
  // ১. Validation Check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({ field: err.path, message: err.msg })),
    });
  }

  try {
    const noticeData = { ...req.body };

    // ২. গুরুত্বপূর্ণ: noticeType যদি স্ট্রিং হিসেবে আসে তবে সেটাকে অ্যারেতে কনভার্ট করা
    if (noticeData.noticeType && typeof noticeData.noticeType  === "string") {
      try {
        noticeData.noticeType = JSON.parse(noticeData.noticeType);
      } catch (e) {
        // যদি JSON না হয়, তবে সেটাকে একটি অ্যারের ভেতর ঢুকিয়ে দিন
        noticeData.noticeType = [noticeData.noticeType];
      }
    }

    // ৩. Cloudinary URL Implementation
    if (req.file) {
      noticeData.attachment = req.file.path; // Multer-Cloudinary path
    }

    const notice = new Notice(noticeData);
    await notice.save();

    res.status(201).json({
      success: true,
      message: `Notice ${notice.status === "Draft" ? "saved as Draft" : "Published"} successfully!`,
      data: notice,
    });
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// 2. Get All Notices (Active vs Draft filtering included)

export const getAllNotices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // ১. কুয়েরি থেকে ফিল্টার প্যারামিটারগুলো নিন
    const { status, targetDept, search } = req.query;
    
    // ২. ডাইনামিক ফিল্টার অবজেক্ট তৈরি করুন
    let filter = {};

    // স্ট্যাটাস ফিল্টার
    if (status) {
      filter.status = status;
    }

    // ডিপার্টমেন্ট ফিল্টার
    if (targetDept && targetDept !== "All Department") {
      // decodeURIComponent নিশ্চিত করবে যে %20 আবার স্পেস হয়ে গেছে
      const decodedDept = decodeURIComponent(targetDept);
      
      // হুবহু ডাটাবেসের নামের সাথে মিলানোর জন্য (Case Insesitive সহ)
      filter.targetDept = { $regex: `^${decodedDept}$`, $options: "i" };
    }

   
    if (search) {
      filter.noticeTitle = { $regex: search, $options: "i" };
    }

    // ৩. ডাটাবেস থেকে ডাটা নিয়ে আসা
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
 
export const updateNoticeStatusOnly = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!updatedNotice) return res.status(404).json({ success: false, message: "Not found" });

    res.status(200).json({ success: true, data: updatedNotice });
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