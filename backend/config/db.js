import mongoose from 'mongoose';

export const connectDB = async () => {
  await mongoose
    .connect(
      'mongodb+srv://obadeagbenga:xozxGqoSfJrS2vnU@cluster0.lr9zquc.mongodb.net/obadinn'
    )
    .then(() => console.log('DB Connected!'));
};
