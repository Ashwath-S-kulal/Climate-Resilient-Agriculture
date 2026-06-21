import Prediction from "../models/prediction.model.js";
import FormData from "form-data";
import axios from "axios";
import { InferenceClient } from "@huggingface/inference";


const client = new InferenceClient(process.env.HF_TOKEN);

export const predictDisease = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const imageBlob = new Blob(
      [req.file.buffer],
      { type: req.file.mimetype }
    );

    const output = await client.imageClassification({
      data: imageBlob,
      model:
        "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification",
      provider: "hf-inference",
    });

    console.log(output);

    return res.json({
      prediction: output[0]?.label,
      confidence: output[0]?.score,
      all_predictions: output,
    });
  } catch (error) {
    console.error("HF Error:", error);

    return res.status(500).json({
      error: error.message,
    });
  }
};

export const createPrediction = async (req, res) => {
  try {
    const { id } = req.params;
    const { prediction, confidence } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID parameter is required" });
    }

    if (!prediction || confidence === undefined) {
      return res.status(400).json({ error: "Prediction and confidence required" });
    }

    const newPrediction = new Prediction({
      userId: id,    
      prediction,
      confidence
    });

    await newPrediction.save();

    res.status(201).json({
      message: "Prediction saved successfully",
      data: newPrediction
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getPredictions = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "ID parameter is required" });
    }

    const predictions = await Prediction.find({ userId: id }).sort({ date: -1 });

    res.json(predictions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const deletePrediction = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Prediction.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Prediction not found" });
    }
    res.json({ message: "Prediction deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const clearPredictionHistory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Delete all predictions for this user
    const deleted = await Prediction.deleteMany({ userId: id });

    res.status(200).json({
      message: "Prediction history cleared successfully",
      deletedCount: deleted.deletedCount
    });

  } catch (err) {
    console.error("Clear history error:", err);
    res.status(500).json({ error: err.message });
  }
};
