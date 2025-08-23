import ConnectDB from "@/app/db/db";
import Product from "@/app/model/products";
import { NextResponse } from "next/server";

export async function POST(req) {

  try {
    await ConnectDB();

    const body = await req.json();
    const { domain } = body;

    console.log("Searching for domain:", domain);

    if (!domain) {
      return NextResponse.json({ message: "Domain is required" }, { status: 400 });
    }

    const products = await Product.find({ domain });
    
    return NextResponse.json({
      items: products
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "An internal server error occurred" }, { status: 500 });
  }
  
}