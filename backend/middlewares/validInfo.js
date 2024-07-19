const emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validEmail = (req, res, next) => {
  const { email } = req.body;
  if (!emailTest.test(email)) {
    return res.status(401).send('Tolong Masukkan email yang benar');
  }
  next();
};

module.exports = validEmail;
