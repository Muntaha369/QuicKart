import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { generatePassword } from '../../store/generatepass';
import User from '../../model/model';
import ConnectDB from '../../db/db';
import Otp from '@/app/model/otp';

export async function POST(req) {
  await ConnectDB();

  const body = await req.json();
  const { name, email, pass } = body;

  if (!name || !email || !pass) {
    return NextResponse.json({ msg: 'Missing required fields' }, { status: 400 });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json({ msg: 'User already exists' });
  }

  const otp = generatePassword(4, false);

  // Clean any previous OTPs
  await Otp.deleteOne({ email });
  await Otp.create({ email, name, otp });

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SEDER_EMAIL,
      pass: process.env.SENDER_PASS
    }
  });

  const mailOptions = {
    from: process.env.SEDER_EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return NextResponse.json({ msg: 'OTP sent successfully', email });
  } catch (error) {
    console.error('Email send failed:', error);
    return NextResponse.json({ msg: 'Failed to send OTP' }, { status: 500 });
  }
}
