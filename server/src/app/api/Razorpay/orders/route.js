import { NextResponse } from "next/server";
import Razorpay from "razorpay";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Razorpay environment variables are not configured");
}

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    
    const options = {
      amount: body.amount*1000 , // Amount in paise (₹500.00)
      currency: "INR",
      receipt: `receipt_${Date.now()}`, // Unique receipt ID
      notes: {
        // Add any additional notes if needed
        order_id: body.orderId || "default_order",
      },
    };

    console.log("Creating Razorpay order with options:", options);
    
    const order = await razorpayInstance.orders.create(options);
    
    console.log("Razorpay order created successfully:", order.id);
    
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    
    if (error.statusCode) {
      return NextResponse.json(
        { 
          error: "Razorpay API Error", 
          message: error.error?.description || error.message,
          statusCode: error.statusCode 
        }, 
        { status: error.statusCode }
      );
    }
    
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message }, 
      { status: 500 }
    );
  }
}