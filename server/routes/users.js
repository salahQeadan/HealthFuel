const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});


router.get("/all", async (req, res) => {
  try {
    let users = await User.find({});
    users = users.map(user => {
      user = user.toObject();
      delete user.password;
      return user;
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get("/allVolunteer", async (req, res) => {
  try {
    const users = await User.find({ isVolunteer: true }); // Find users where isVolunteer is true
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

