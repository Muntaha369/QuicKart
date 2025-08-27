import ConnectDB from "@/app/db/db";
import Product from "@/app/model/products";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    await ConnectDB()

    const products = await Product.find()


    return NextResponse.json({
      products:products.map((val)=>val.name)
    });

  } catch (error) {
    
  }
}