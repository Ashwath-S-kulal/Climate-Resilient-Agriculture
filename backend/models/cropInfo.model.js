import mongoose from "mongoose";

const CropSchema = new mongoose.Schema({
  Crop_Name: { type: String, required: true },
  Image_Description: { type: String },

  Ideal_pH: String,
  Water_Needs: String,
  Sunlight_Requirements: String,
  Soil_Type: String,
  Planting_Season: String,
  Typical_Height_m: String,
  Yield_Tons_Hectare: String,
  Optimal_Temp_C: String,

}, { strict: false });

export default mongoose.model("CropInfo", CropSchema);
