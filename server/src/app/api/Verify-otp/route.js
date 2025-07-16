import { NextResponse } from "next/server";
import { getOtp, clearOtp } from '../../store/store';
import User from "../../model/model";

export async function POST(req){

  const body = await req.json();
  const { email, pass, otp } = body;

  const record = getOtp(email);
  if (!record) {
    return NextResponse.json({ msg: 'No OTP requested for this email' }, { status: 400});
  }

  if (record.otp !== otp) {
    return NextResponse.json({ msg: 'Invalid OTP' }, { status: 400 });
  }

  const UserCreated = await User.create({ name: record.name, email, pass });
  clearOtp(record.name)

  NextResponse.json({ msg: 'User created successfully', user: UserCreated });
}