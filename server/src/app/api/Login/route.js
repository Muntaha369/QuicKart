import { NextResponse } from "next/server";
import User from "../../model/model";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();
  const { email, pass } = body;

  const userExist = await User.findOne({ email });

  if (!userExist) {
    return NextResponse.json({ msg: "User does not exist" }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(pass, userExist.pass); 

  if (!isPasswordValid) {
    return NextResponse.json({ msg: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json(
    { msg: "Logged in successfully" },
    { status: 200 }
  );
}
