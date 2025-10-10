import Admin from '../models/admin.model.js';

// Fetch all admins
export const fetchAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find({});
    return res.json(admins);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Fetch admin by ID
export const fetchAdminById = async (req, res) => {
  try {
    const admin = await Admin.findOne({ user_id: req.params.id });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    return res.json(admin);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update admin by ID
export const updateAdminById = async (req, res) => {
  try {
    const updatedAdmin = await Admin.findOneAndUpdate(
      { user_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedAdmin) return res.status(404).json({ message: 'Admin not found' });
    return res.json(updatedAdmin);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
