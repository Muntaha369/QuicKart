import { NextResponse } from "next/server";
import User from "../../model/model";
import Otp from "@/app/model/otp";
import ConnectDB from "@/app/db/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  await ConnectDB();

  const body = await req.json();
  const { email, pass, otp } = body;

  const record = await Otp.findOne({ email });
  if (!record) {
    return NextResponse.json({ msg: 'No OTP requested for this email' }, { status: 400 });
  }

  if (record.otp !== otp) {
    return NextResponse.json({ msg: 'Invalid OTP' }, { status: 400 });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(pass, saltRounds);
  const userCreated = await User.create({ name: record.name, email, pass: hashedPassword });

  await Otp.deleteOne({ email }); 

  return NextResponse.json({ msg: 'User created successfully', user: userCreated });
}

