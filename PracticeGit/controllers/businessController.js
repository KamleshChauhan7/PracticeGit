// const BasicInfo = require('../models/central/BasicInfo');
// const BusinessDetail = require('../models/project/BusinessDetail');

// exports.registerBusiness = async (req, res) => {
//   // 1. Destructure all incoming data
//   const { businessName, businessEmail, businessPhone, // These go to Central DB
//     address, taxNumber, website            // These go to Project DB
//   } = req.body;

//   let createdBasicInfo;

//   try {

//     //Save data in DB-1
//     createdBasicInfo = await BasicInfo.create({
//       businessName,
//       businessEmail,
//       businessPhone
//     });

//     //Save data in Db-2
//     await BusinessDetail.create({
//       centralId: createdBasicInfo.id,
//       address,
//       taxNumber,
//       website
//     });

//     // send response
//     return res.status(201).json({
//       message: 'Business registered',
//       data: {
//         id: createdBasicInfo.id,
//         businessName
//       }
//     });

//   } catch (error) {
//     console.error("Registration Error:", error);


//     // here we chech that if createBasicInfo fail to insert record into database-1
//     //then rollback from same database -1
//     if (createdBasicInfo) {
//       await BasicInfo.destroy({ where: { id: createdBasicInfo.id } });
//     }

//     return res.status(500).json({ message: 'Registration failed.', error: error.message });
//   }
// };


// exports.getBusinessProfile = async (req, res) => {

//   const { id } = req.params; //get id of business_reg table from db-1

//   try {

//     const basicInfo = await BasicInfo.findByPk(id); // fetch Database -1

//     if (!basicInfo) { // if user not found then stop
//       return res.status(404).json({
//         message: 'Business Not Found',
//         error: `No record found in DB-1 with pk: ${id}`
//       });
//     }

//     //here we check central_id with our project databse table
//     const businessDetails = await BusinessDetail.findOne({
//       where: { centralId: id }
//     });

//     const basicJson = basicInfo.toJSON();
//     const detailsJson = businessDetails ? businessDetails.toJSON() : {};

//     // combine those two databaase response into json
//     const fullProfile = {
//       ...basicJson,     // id, businessName, businessEmail, businessPhone
//       ...detailsJson,   // address, taxNumber, website 

//     };

//     // response sending
//     return res.status(200).json({
//       success: true,
//       data: fullProfile
//     });

//   } catch (error) {
//     console.error("Error fetching business profile:", error);
//     return res.status(500).json({
//       message: 'Server Error',
//       error: error.message
//     });
//   }
// };



// controllers/businessController.js
const businessService = require('../services/businessService');

// POST /register
exports.registerBusiness = async (req, res) => {
    try {
        // Call the service
        const result = await businessService.createBusiness(req.body);

        return res.status(201).json({
            success: true,
            message: 'Business registered successfully',
            data: result
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message
        });
    }
};

// GET /profile/:id
exports.getBusinessProfile = async (req, res) => {
    const { id } = req.params;

    try {
        // Call the service
        const profile = await businessService.getBusinessById(id);

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Business not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: profile
        });

    } catch (error) {
        console.error("Fetch Error:", error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
};