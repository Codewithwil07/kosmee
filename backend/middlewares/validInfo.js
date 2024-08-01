const emailTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validInfo = (req, res, next) => {
  const { email } = req.fields;
  if (!emailTest.test(email)) {
    return res.status(401).send('Tolong Masukkan email yang benar');
  }
  next();
};

module.exports = validInfo;
