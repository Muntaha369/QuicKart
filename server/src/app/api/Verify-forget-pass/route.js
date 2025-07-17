import { NextResponse } from "next/server";
import Otp from "@/app/model/otp";
import ConnectDB from "@/app/db/db";

export async function POST(req){
  await ConnectDB();

  const body = await req.json();
  const { email, otp } = body;

  const record = await Otp.findOne({ email });
  if (!record){
    return NextResponse.json({ msg: 'No OTP requested for this email' }, { status: 400 });
  }

  if (record.otp !== otp) {
    return NextResponse.json({ msg: 'Invalid OTP' }, { status: 400 });
  }
  return NextResponse.json({msg:'Opt verified successfuly'},{status:200})
}