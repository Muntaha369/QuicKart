import { NextResponse } from "next/server";
import User from "../../model/model";
import nodemailer from 'nodemailer';
import Otp from '@/app/model/otp';
import ConnectDB from "@/app/db/db";
import { generatePassword } from "../../store/generatepass";

export async function POST(req){

    await ConnectDB();

  const body = await req.json();
  const { email, name } = body;

  const userExist = await User.findOne({ email })
  if (!userExist){
    return NextResponse.json({msg: "Not signed up"}, {status:401});
  }

  const otp = generatePassword(4, false);
  
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