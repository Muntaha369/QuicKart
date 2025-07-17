import { NextResponse } from "next/server";
import User from "../../model/model";
import ConnectDB from "@/app/db/db";

export async function POST(req) {
  await ConnectDB();

  const body = await req.json();  // ✅ Correct way to parse body
  const { email, pass } = body;

  const userData = await User.findOne({ email });

  if (!userData) {
    return NextResponse.json({ msg: 'User not found' }, { status: 404 });
  }

  await User.findOneAndUpdate({ email }, { $set: { pass } }); // ✅ Safer update

  return NextResponse.json({ msg: 'Password changed successfully' }, { status: 200 });
}
