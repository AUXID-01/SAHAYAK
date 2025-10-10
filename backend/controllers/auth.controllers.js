import User from '../models/User.js';
import AshaWorker from '../models/AshaWorker.js';
import PHCStaff from '../models/PHCStaff.js';
import Admin from '../models/Admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// ------------------------- REGISTER -------------------------
export const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      password,
      user_type,
      date_of_birth,
      gender,
      photo_url,
      address,
      training_completed,
      certifications,
      associated_phc,
      bank_details,
      permissions,
      roles,
      regions_managed
    } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered' });

    // Hash the password
    const password_hash = await bcrypt.hash(password, 10);

    // Create a new User
    const newUser = await User.create({
      user_id: crypto.randomUUID(),
      first_name,
      last_name,
      email,
      phone_number,
      password_hash,
      user_type
    });

    // Create role-specific document
    switch (user_type) {
      case 'asha_worker':
        await AshaWorker.create({
          user_id: newUser.user_id,
          date_of_birth,
          gender,
          photo_url,
          address,
          training_completed: training_completed || [],
          certifications: certifications || [],
          associated_phc,
          bank_details
        });
        break;

      case 'phc_staff':
        await PHCStaff.create({
          user_id: newUser.user_id,
          date_of_birth,
          gender,
          photo_url,
          address,
          training_completed: training_completed || [],
          certifications: certifications || [],
          bank_details,
          permissions: permissions || []
        });
        break;

      case 'admin':
        await Admin.create({
          user_id: newUser.user_id,
          roles: roles || [],
          permissions: permissions || [],
          regions_managed: regions_managed || []
        });
        break;

      default:
        return res.status(400).json({ message: 'Invalid user type' });
    }

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser.user_id,
        email: newUser.email,
        user_type: newUser.user_type
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

// ------------------------- LOGIN -------------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid)
      return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.user_id, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // ------------------- Role-specific data -------------------
    let roleData = {};

    if (user.user_type === 'asha_worker') {
      const asha = await AshaWorker.findOne({ user_id: user.user_id });
      if (asha) {
        roleData = {
          associated_phc: asha.associated_phc,
          training_completed: asha.training_completed,
          certifications: asha.certifications,
          verification_status: asha.verification_status
        };
      }
    } else if (user.user_type === 'phc_staff') {
      const phcStaff = await PHCStaff.findOne({ user_id: user.user_id });
      if (phcStaff) {
        roleData = {
          permissions: phcStaff.permissions,
          training_completed: phcStaff.training_completed,
          certifications: phcStaff.certifications
        };
      }
    } else if (user.user_type === 'admin') {
      const admin = await Admin.findOne({ user_id: user.user_id });
      if (admin) {
        roleData = {
          roles: admin.roles,
          permissions: admin.permissions,
          regions_managed: admin.regions_managed
        };
      }
    }

    // ------------------- Response -------------------
    return res.json({
      token,
      user: {
        id: user.user_id,
        email: user.email,
        user_type: user.user_type,
        first_name: user.first_name,
        last_name: user.last_name,
        ...roleData // Merge role-specific data into the response
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
