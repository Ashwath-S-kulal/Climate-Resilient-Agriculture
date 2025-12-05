import Crop from "../models/cropSteps.model.js";

export const getAllCrops = async (req, res) => {
    try {
        const crops = await Crop.find({});
        res.json(crops);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCropById = async (req, res) => {
    try {
        const crop = await Crop.findOne({ id: req.params.id });
        if (!crop) return res.status(404).json({ message: "Crop not found" });
        res.json(crop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
