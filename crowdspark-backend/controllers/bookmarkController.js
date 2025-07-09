const User = require("../models/user");

exports.addBookmark = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { bookmarks: req.params.id } });
  res.status(200).json({ message: "Added to bookmarks" });
};

exports.removeBookmark = async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $pull: { bookmarks: req.params.id } });
  res.status(200).json({ message: "Removed from bookmarks" });
};

exports.getBookmarks = async (req, res) => {
  const user = await User.findById(req.user.id).populate("bookmarks");
  res.status(200).json(user.bookmarks);
};