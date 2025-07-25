import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // Expires after 300 seconds (5 minutes)
  }
});

const Otp = mongoose.models.Otp || mongoose.model('Otp', OtpSchema);
export default Otp;
