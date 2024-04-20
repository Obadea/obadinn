import userModal from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';
import nodemailer from 'nodemailer';

// Sending email functionality

const sendEmail = (userName, userEmail) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'elegantbeautycollections01@gmail.com',
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Elegant Collection',
    to: userEmail,
    subject: 'Welcome to Elegant Collection! Get Started with Your New Account',
    text: `Dear ${userName},

  Welcome to Elegant Collections! We're thrilled to have you join our growing community of online shoppers. As a valued member of Elegant Collections, you now have access to a wide range of high-quality products and exclusive deals.
  
  With your new account, you can enjoy the following benefits:
  
  Browse our extensive collection of fashion, accessories, home decor, and more.
  Save your favorite items to your wishlist for easy access later.
  Seamlessly track your orders and stay updated on their status.
  Receive personalized recommendations based on your preferences and browsing history.
  Enjoy priority access to special promotions and discounts.
  We're committed to providing you with an exceptional shopping experience, and we're here to assist you every step of the way. If you have any questions or need assistance, our dedicated customer support team is available to help.
  
  Thank you for choosing Elegant Collections for all your shopping needs. We look forward to serving you and providing you with a delightful shopping experience.
  
  Happy shopping!
  
  Best regards,
  The Elegant Collection Team`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModal.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User does not exit' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: 'Error Loging In' });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// register  user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // checking if user already exists
    const exists = await userModal.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // Validating email formats & strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Please a vaild email' });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Please input a strong password',
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(11);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModal({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
    sendEmail(user.name, user.email);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error Creating user' });
  }
};

export { loginUser, registerUser };
