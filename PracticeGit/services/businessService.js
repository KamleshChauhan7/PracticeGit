// services/businessService.js
const BasicInfo = require('../models/central/BasicInfo');
const BusinessDetail = require('../models/project/BusinessDetail');

/**
 * Service to register a new business across two databases.
 * Handles the creation and manual rollback if needed.
 */
exports.createBusiness = async (data) => {
    let createdBasicInfo = null;

    try {
        // 1. Save to Central DB
        createdBasicInfo = await BasicInfo.create({
            businessName: data.businessName,
            businessEmail: data.businessEmail,
            businessPhone: data.businessPhone
        });

        // 2. Save to Project DB
        const createdDetail = await BusinessDetail.create({
            centralId: createdBasicInfo.id,
            address: data.address,
            taxNumber: data.taxNumber,
            website: data.website
        });

        // 3. Return Combined Result
        return {
            ...createdBasicInfo.toJSON(),
            ...createdDetail.toJSON(),
            centralId: undefined // Cleanup: remove duplicate ID
        };

    } catch (error) {
        // MANUAL ROLLBACK LOGIC
        if (createdBasicInfo) {
            console.error("Service: Rolling back Central DB entry due to error...");
            await BasicInfo.destroy({ where: { id: createdBasicInfo.id } });
        }
        throw error; // Re-throw error so Controller can see it
    }
};


exports.getBusinessById = async (id) => {
   
    const basicInfo = await BasicInfo.findByPk(id);

    if (!basicInfo) {
        return null;    //user not exist
    }

    // fetch record
    const businessDetails = await BusinessDetail.findOne({
        where: { centralId: id }
    });

    // combine both data
    const basicJson = basicInfo.toJSON();
    const detailsJson = businessDetails ? businessDetails.toJSON() : {};

    return {
        ...basicJson,
        ...detailsJson,
        centralId: undefined
    };
};