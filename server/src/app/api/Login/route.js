import { NextResponse } from "next/server";
import User from "../../model/model";

export async function POST(req){
  
  const body = await req.json();
  const { email, pass } = body;
  const userExist = await User.findOne({email});
  
  if(!userExist) {return NextResponse.status(401).json({msg:'User do not exist'})}

  const isPasswordValid = pass;
 
  if (!isPasswordValid) {
    return NextResponse.status(401).json({ msg: "Invalid credentials" });
  }

  NextResponse.status(200).json({
    msg:'logged in successfully',
  })
}