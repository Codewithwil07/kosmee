const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const DetailKos = require('../models/DetailKos.js');

const reviewCurrentKos = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    if (!req.user) {
      res.status(401).send('Unauthorized');
      return;
    }

    const kos = await DetailKos.findById(req.params.id);
    const user = await User.findById(req.user._id);

    console.log(user);

    if (kos) {
      const alreadyReviewed = kos.reviews.find(
        (r) => r.user.toString() === r.user._id.toString()
      );
      if (alreadyReviewed) {
        res.status(404);
        throw new Error('Kos  already reviewed');
      }
    }

    const review = {
      name: user.nama_lengkap,
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
