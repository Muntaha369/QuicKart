import { NextResponse } from "next/server";
import { otpStore, setOtp, getOtp } from '../../store/store'


export async function POST(req) {
  const body = await req.json(); // correctly parse JSON body
  const { name } = body;

  if(name === "jamal"){
    setOtp(name, "39", "5'11");
    return NextResponse.json({ msg: `OTP set for Jamal is `, otpfry:getOtp(name) }, { status: 200 });
  }
else{
  return NextResponse.json({msg:'Babushka', otpfry: otpStore }, { status: 200 });}
}