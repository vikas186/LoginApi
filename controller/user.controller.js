const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET_KEY } = require("../utility/config");

exports.user = async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      const findUser = await UserModel.findOne({ email: email });
      

      if (findUser == null) {

        const existingUserPhone = await UserModel.findOne({ phone: phone });
        if (existingUserPhone) {
          return res.status(409).json({ message: 'Phone no already exists' });
        }
  
        const salt = bcrypt.genSaltSync(15);
        const passwordHash = bcrypt.hashSync(password, salt);
  
        const newUser = await UserModel.create({
          name,
          email,
          password: passwordHash,
          phone,
        });
  
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
      } else  {

        const checkPassword = bcrypt.compareSync(password, findUser.password);
        if (!checkPassword) {
          return res.status(409).json({ message: 'Password is wrong!' });
        }
        // console.log(checkPassword)

        const token = jwt.sign(
          { _id: findUser._id, email: findUser.email },
          JWT_SECRET_KEY,
          {
            expiresIn: '1h',
          }
        );
  
        return res.status(200).json({ message: 'User login successfully', token, user: findUser });
      } 
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };

  exports.userProfile = async (req,res) => {
    try {
        const userId = req.user._id
        const findUser = await UserModel.findOne({ _id: userId });
        if (!findUser) {
          return res.status(409).json({ message: "Email not found!" });
        }

        const userpassword = findUser.toObject()

        delete userpassword.password;
    
        res
        .status(200)
        .json({ message: "User profile successfully", user: userpassword });
    } catch (error) {
        console.log("Error:", error);
    }
}
