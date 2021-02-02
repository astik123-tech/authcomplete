
const UserModel = require("../models/user-model");


module.exports = {
  getAllUsersController: async (req, res, next) => {
    try {
      const data = await UserModel.find({});
      res.json({
        success: true,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  getUsersByIdController: async (req, res, next) => {
    try {
      const data = await UserModel.findOne({ _id: req.params.userId });
      res.json({
        success: true,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  addNewUserController: async (req, res, next) => {
    try {
      const { firstName, lastName, phoneNumber } = req.body;
      const newUser = new UserModel({
        first_name: firstName,
        last_name: lastName,
        phoneNumber: phoneNumber,
      });
      await newUser.save();
      res.json({
        success: true,
        message: "successful",
      });
    } catch (error) {
      next(error);
    }
  },
  deleteUserByIdController: async (req, res, next) => {
    try {
      const _id = req.params.userId;
      const data = await UserModel.deleteOne({ _id: _id });

      if (data.deletedCount !== 0) {
        res.json({
          success: true,
          message: "Successfully Deleted",
        });
      } else {
        res.json({
          success: false,
          message: "Failed to Delete",
        });
      }
    } catch (error) {
      next(error);
    }
  },
};
