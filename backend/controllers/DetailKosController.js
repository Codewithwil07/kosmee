const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const DetailKos = require('../models/DetailKos.js');

const reviewCurrentKos = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const kos = await DetailKos.findById(req.params.id);
    const name = await User.findById(req.user._id).select('nama_lengkap');

    const review = {
      nama: name.nama_lengkap,
      rating,
      comment,
    };

    kos.reviews.push(review);

    kos.numReviews = kos.reviews.length;

    kos.rating = kos.reviews.reduce(
      (acc, item) => item.rating + acc,
      0 / kos.reviews.length
    );

    const newComment = await kos.save();

    return res.status(200).json(newComment);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('server error');
  }
};






module.exports = {
  reviewCurrentKos,
};
