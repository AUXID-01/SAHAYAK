import mongoose from "mongoose";

const phcStaffSchema = new mongoose.Schema(
  {
    user_id: {
      type: String, // If you're using UUIDs in User schema
      ref: "User",
      required: true,
    },

    date_of_birth: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    photo_url: {
      type: String,       //No change needed. Just ensure your backend handles file upload and returns/stores the URL.
    },

    address: {
      village: String,
      ward: String,
      block: String,
      district: String,
      state: String,
      pin_code: String,
    },

    training_completed: [
      {
        type: String,
      },
    ],

    certifications: [{
      title: String,
      certificate_url: String,  // optional, for file uploads
      issued_by: String,
      date_issued: Date
    }],

    bank_details: {
      bank_account_number: String,
      ifsc_code: String,
      bank_name: String,
    },

    permissions: [
      {
        type: String, // Populated from UI (multi-select list)
      },
    ],
  },
  {
    timestamps: true, // ✅ Automatically adds createdAt and updatedAt
  }
);

const PHCStaff = mongoose.model("PHCStaff", phcStaffSchema);

export default PHCStaff;
