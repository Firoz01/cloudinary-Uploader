const User = require("../model/user");
const catchAsync = require("../utils/catchAsync");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

exports.uploadImage = catchAsync(async (req, res, next) => {
  // Upload image to cloudinary
  const result = await cloudinary.uploader.upload(req.file.path);

  // Create new user
  let user = new User({
    name: req.body.name,
    avatar: result.secure_url,
    cloudinary_id: result.public_id,
  });
  // Save user
  await user.save();
  res.json(user);
});
