import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import bcryptjs from 'bcryptjs';

export const test =(req, res)=>{
    res.json({
        message:'API is working',
    });
};

export const updateUser = async (req, res) => {
  try {
    // Check authentication
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Allow user to update only themselves OR admin
    if (req.user.id !== req.params.id && !req.user.isAdmin) {
      return res
        .status(403)
        .json({ message: "You can update only your account!" });
    }

    // Hash password only if provided
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          ...(req.body.password && { password: req.body.password }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);

  } catch (error) {
    console.error("UPDATE USER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};




export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }

}