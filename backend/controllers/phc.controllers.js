import PHCStaff from '../models/phc.model.js';

// Fetch all PHC staff
export const fetchAllPhcStaff = async (req, res) => {
  try {
    const phcStaff = await PHCStaff.find({});
    return res.json(phcStaff);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Fetch PHC staff by ID
export const fetchPhcStaffById = async (req, res) => {
  try {
    const phc = await PHCStaff.findOne({ user_id: req.params.id });
    if (!phc) return res.status(404).json({ message: 'PHC Staff not found' });
    return res.json(phc);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update PHC staff by ID
export const updatePhcStaffById = async (req, res) => {
  try {
    const updatedPhc = await PHCStaff.findOneAndUpdate(
      { user_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedPhc) return res.status(404).json({ message: 'PHC Staff not found' });
    return res.json(updatedPhc);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
