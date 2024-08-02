const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validInfo = (req, res, next) => {
  const { email } = req.fields || req.body;

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: 'Tolong masukkan email yang benar' });
  }

  next();
};

module.exports = validInfo;
