import AshaWorker from '../models/asha.model.js';

// Fetch all ASHA workers
export const fetchAllAshaWorkers = async (req, res) => {
  try {
    const ashaWorkers = await AshaWorker.find({});
    return res.json(ashaWorkers);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Fetch ASHA worker by ID
export const fetchAshaWorkerById = async (req, res) => {
  try {
    const asha = await AshaWorker.findOne({ user_id: req.params.id });
    if (!asha) return res.status(404).json({ message: 'ASHA Worker not found' });
    return res.json(asha);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Update ASHA worker by ID
export const updateAshaWorkerById = async (req, res) => {
  try {
    const updatedAsha = await AshaWorker.findOneAndUpdate(
      { user_id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedAsha) return res.status(404).json({ message: 'ASHA Worker not found' });
    return res.json(updatedAsha);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
