import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    user_id: {
      type: String, // UUID or reference to User
      ref: "User",
      required: true,
      unique: true,
    },

    roles: [
      {
        type: String,
        enum: ["superadmin", "regionaladmin", "dataadmin"], // Fixed role names
        required: true,
      },
    ],

    permissions: [
      {
        type: String, // Granular permissions assigned via UI
      },
    ],

    regions_managed: [
      {
        type: String, // Region codes or names
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
