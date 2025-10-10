import User from '../models/user.model.js'; // match your model filename

// Fetch all users
export const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Fetch user by ID
export const fetchUserById = async (req, res) => {
  try {
    const user = await User.findOne({ user_id: req.params.id });
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update user by ID
export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Delete user by ID
export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ user_id: req.params.id });
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
