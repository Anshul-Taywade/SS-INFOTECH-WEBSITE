const Settings = require('../models/Settings.model');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const DATA_DIR = path.join(__dirname, '../data');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

const defaultSettings = {
  companyName: 'SS INFOTECH',
  certification: 'ISO 9001:2015 Certified Firm',
  email: 'info@ssinfotech.org',
  phone: '+91 77700 23791',
  address: '#40, 2nd Floor, 2nd Cross, 2nd Main, Outer Ring Road, Bangalore.',
  location: 'Software R&D Hub & Training Center',
  galleryRealMode: true,
  autoSyncMedia: true,
};

const getLocalSettings = () => {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const content = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      return { ...defaultSettings, ...JSON.parse(content) };
    }
  } catch (err) {
    console.warn('[Settings] Could not read local settings file:', err.message);
  }
  return defaultSettings;
};

const saveLocalSettings = (data) => {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[Settings] Could not write local settings file:', err.message);
  }
};

// @desc    Get site settings
// @route   GET /api/v1/settings
// @access  Public
exports.getSettings = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState === 1) {
      try {
        let settings = await Settings.findOne();
        if (!settings) {
          const initial = getLocalSettings();
          settings = await Settings.create(initial);
        }
        const dataObj = settings.toObject ? settings.toObject() : settings;
        saveLocalSettings(dataObj);
        return res.status(200).json({
          success: true,
          data: dataObj,
        });
      } catch (dbErr) {
        console.warn('[Settings] MongoDB find failed, using file fallback:', dbErr.message);
      }
    }

    const fallback = getLocalSettings();
    return res.status(200).json({
      success: true,
      data: fallback,
    });
  } catch (error) {
    const fallback = getLocalSettings();
    return res.status(200).json({
      success: true,
      data: fallback,
    });
  }
};

// @desc    Update site settings
// @route   PUT /api/v1/settings
// @access  Public/Admin
exports.updateSettings = async (req, res, next) => {
  try {
    const incomingData = req.body || {};
    const currentLocal = getLocalSettings();
    const mergedSettings = { ...currentLocal, ...incomingData };

    // Always persist to local JSON file immediately
    saveLocalSettings(mergedSettings);

    // If MongoDB is connected, update DB document as well
    if (mongoose.connection.readyState === 1) {
      try {
        let settings = await Settings.findOne();
        if (!settings) {
          settings = await Settings.create(mergedSettings);
        } else {
          settings = await Settings.findByIdAndUpdate(settings._id, mergedSettings, {
            new: true,
            runValidators: true,
          });
        }
        const dataObj = settings.toObject ? settings.toObject() : settings;
        return res.status(200).json({
          success: true,
          data: dataObj,
        });
      } catch (dbErr) {
        console.warn('[Settings] MongoDB update failed, fallback saved to file:', dbErr.message);
      }
    }

    return res.status(200).json({
      success: true,
      data: mergedSettings,
    });
  } catch (error) {
    next(error);
  }
};
