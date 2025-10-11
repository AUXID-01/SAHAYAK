import mongoose from "mongoose";

const ashaSchema = new mongoose.Schema(
  {
    user_id: {
      type: String, // Or: mongoose.Schema.Types.ObjectId if referencing by _id
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
      type: String,    // No change needed. Just ensure your backend handles file upload and returns/stores the URL.
    },

    address: {
      village: { type: String },
      ward: { type: String },
      block: { type: String },
      district: { type: String },
      state: { type: String },
      pin_code: { type: String },
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


    associated_phc: {
      type: String,
      required: true,
    },

    bank_details: {
      bank_account_number: { type: String },
      ifsc_code: { type: String },
      bank_name: { type: String },
    },

  },
  {
    timestamps: true,
  }
);

const AshaWorker = mongoose.model("AshaWorker", ashaSchema);

export default AshaWorker;
