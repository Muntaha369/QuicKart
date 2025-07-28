import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import ConnectDB from "@/app/db/db";
import Product from "@/app/model/products"

export async function POST(req) {
  try {

    await ConnectDB()

    const data = await req.formData();
    const file = data.get('file');

    // Get other form fields the same way
    const domain = data.get('domain');
    const subdomain = data.get('subdomain');
    const name = data.get('name');
    const price = data.get('price');
    const description = data.get('description');

    // --- Validation ---
    if (!file) {
      return NextResponse.json({ success: false, message: 'No file found' }, { status: 400 });
    }
    if (!domain || !subdomain || !name || !price || !description) {
      return NextResponse.json({ success: false, message: 'Image type (imgtype) is required' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // --- Save the file ---
    const filename = `${Date.now()}-${name}`; // Create a unique filename
    const filePath = path.join(process.cwd(), 'public/uploads', filename+".png");
    await writeFile(filePath, buffer);

    const newProduct = await Product.create({
      domain,
      subdomain,
      name:filename,
      price,
      description
    })

    // --- Use the data ---
    console.log(`File uploaded: ${filename}`);
    console.log(newProduct);
    // Here you would save 'filename' and 'imgtype' to your database

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      product: newProduct
    });

  } catch (error) {
    console.error('Error handling upload:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}