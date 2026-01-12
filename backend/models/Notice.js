import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    noticeTitle: {
      type: String,
      required: [true, "Notice title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters long"],
    },

    targetDept: {
      type: String,
      required: [true, "Target department is required"],
      default: "All Department",
    },

    noticeType: {
      type: [String],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "At least one notice type must be selected",
      },
    },

    employeeId: { type: String, default: null },
    employeeName: { type: String, default: null },
    position: { type: String, default: null },

    publishDate: {
      type: String,
      required: [true, "Publish date is required"],
    },
    noticeDescription: {
      type: String,
      required: [true, "Notice description is required"],
    },

    attachment: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: {
        values: ["Published", "Draft", "Unpublished"],
        message: "{VALUE} is not a valid status",
      },
      default: "Draft",
    },
  },
  { timestamps: true }
);
const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
