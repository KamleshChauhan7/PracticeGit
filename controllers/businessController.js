const BasicInfo = require('../models/central/BasicInfo');
const BusinessDetail = require('../models/project/BusinessDetail');

exports.registerBusiness = async (req, res) => {
  // 1. Destructure all incoming data
  const { 
    businessName, 
    businessEmail, 
    businessPhone, // These go to Central DB
    address, 
    taxNumber, 
    website        // These go to Project DB
  } = req.body;

  let createdBasicInfo = null;

  try {
    // Step 1: Save to Central Database
    createdBasicInfo = await BasicInfo.create({
      businessName,
      businessEmail,
      businessPhone
    });

    // Step 2: Save to Project Database (using ID from Step 1)
    await BusinessDetail.create({
      centralId: createdBasicInfo.id, // Linking the two
      address,
      taxNumber,
      website
    });

    // Step 3: Send Success Response
    return res.status(201).json({
      message: 'Business registered successfully across both databases.',
      data: {
        id: createdBasicInfo.id,
        businessName
      }
    });

  } catch (error) {
    console.error("Registration Error:", error);

    // MANUAL ROLLBACK:
    // If Step 2 fails, we must delete the data created in Step 1
    // to keep databases consistent.
    if (createdBasicInfo) {
      await BasicInfo.destroy({ where: { id: createdBasicInfo.id } });
    }

    return res.status(500).json({ message: 'Registration failed.', error: error.message });
  }
};