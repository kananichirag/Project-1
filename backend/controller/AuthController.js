const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");

const SignUp = async (req, res, next) => {
  const { firstname, lastname, email, password, image } = req.body;
  const CheckUser = await User.findOne({ email: email });

  try {
    if (CheckUser) {
      return res.json({ msg: "Email Already Exits.!!!", alert: false });
    } else {
      const HasPass = bcryptjs.hashSync(password, 10);
      const newUser = new User({
        firstname,
        lastname,
        image,
        email,
        password: HasPass,
      });

      await newUser.save();
      res.json({ msg: "Registration Succfully.!!", alert: true });
    }
  } catch (error) {
    res
      .status(404)
      .json({ msg: "Password Or Email Already Exits.!!", alert: false });
  }
};

const SignIn = async (req, res) => {
  const { email,password } = req.body;

  try {
    const CheckUser = await User.findOne({ email: email });
    if (!CheckUser) {
      return res.json({ msg: "User Not Found.!!!" , alert:false});
    }
    const validPass = await bcryptjs.compare(password, CheckUser.password);
    if (!validPass) {
      return res.json({ msg: "Password is Incorrect..!!" , alert:false});
    } else {
      res.json({msg:"Login Succfully..!!",alert:true})
    }
  } catch (error) {
   console.log(error);
  }
};

module.exports = {
  SignUp,
  SignIn,
};
