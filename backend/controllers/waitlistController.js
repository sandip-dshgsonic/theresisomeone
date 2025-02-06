
const WaitlistEntry = require('../models/WaitlistEntry');
const { successResponse, errorResponse } = require('../utils/responseHelper');

exports.getAllEntries = async (req, res) => {
  try {
    const entries = await WaitlistEntry.find()
      .sort({ createdAt: -1 });
    
    return successResponse(res, 200, 'Entries retrieved successfully', entries);
  } catch (error) {
    return errorResponse(res, 500, 'Error retrieving entries', error);
  }
};

exports.createEntry = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Check if email already exists
    const existingEntry = await WaitlistEntry.findOne({ email });
    if (existingEntry) {
      return errorResponse(res, 400, 'Email already registered');
    }

    const entry = new WaitlistEntry({
      name,
      email,
      phone
    });

    const savedEntry = await entry.save();
    return successResponse(res, 201, 'Entry created successfully', savedEntry);
  } catch (error) {
    return errorResponse(res, 400, 'Error creating entry', error);
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const update = { ...req.body, updatedAt: Date.now() };
    
    const entry = await WaitlistEntry.findByIdAndUpdate(
      id,
      update,
      { new: true, runValidators: true }
    );

    if (!entry) {
      return errorResponse(res, 404, 'Entry not found');
    }

    return successResponse(res, 200, 'Entry updated successfully', entry);
  } catch (error) {
    return errorResponse(res, 400, 'Error updating entry', error);
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await WaitlistEntry.findByIdAndDelete(id);

    if (!entry) {
      return errorResponse(res, 404, 'Entry not found');
    }

    return successResponse(res, 200, 'Entry deleted successfully');
  } catch (error) {
    return errorResponse(res, 400, 'Error deleting entry', error);
  }
};