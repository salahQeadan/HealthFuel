const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Invalid Email" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: { token, isAdmin: user.isAdmin }, message: "logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password"),
  });
  return schema.validate(data);
};

router.get('/', (req, res) => {
  MyModel.find({}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      res.send(data);
    }
  });
});

module.exports = router;
