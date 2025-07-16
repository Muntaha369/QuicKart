import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { useStore } from 'zustand';
import { generatePassword } from '../../store/generatepass';
import User from '../../model/model';

const { setOtp } = useStore();

export async function POST(req) {

  const body = await req.json();
  const { name, email, pass } = body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json({ msg: 'User already exists' });
  }

  const otp = generatePassword(4, false);
  setOtp( otp, name, Date.now() );

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.SEDER_EMAIL}`,
      pass: `${process.env.SENDER_PASS}`
    }
  });

  let mailOptions = {
    from: `${process.env.SEDER_EMAIL}`,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      return NextResponse.json({ msg: 'Failed to send OTP' },{ status: 500 });
    } else {
      console.log('Email sent: ' + info.response);
      return NextResponse.json({ email, pass });
    }
  });
}


