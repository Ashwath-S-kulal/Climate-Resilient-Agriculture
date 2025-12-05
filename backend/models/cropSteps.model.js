import mongoose from "mongoose";

const CropStepSchema = new mongoose.Schema({
  id: { type: String, required: true },          
  name: { type: String, required: true },        
  type: { type: String, required: true },        
  season: { type: String },                      
  image: { type: String },                       
  title: { type: String },                       
  overview: { type: String },                    
  steps: { type: [String] }                       
});


export default mongoose.model("CropStep", CropStepSchema);
