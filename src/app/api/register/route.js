import { NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB";
import User from "../../../../models/User";
import bcrypt from "bcrypt";

export async function GET(DATA) {
  console.log("--> api/register (GET) got hit!");
  console.log(DATA);

  return NextResponse.json({ message: "Nice GET HIT" });
}

export async function POST(DATA) {
  console.log("--> api/register (POST) got hit!");

  await connectDB();
  const { name, email, password } = await DATA.json();
  let hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    role: "user",
  });

  return NextResponse.json({ message: "User was created Successfully!", user });
}
