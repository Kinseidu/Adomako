import mongoose from "mongoose";
import dotenv from "dotenv";
import { Admin } from "./src/models/Admin";

dotenv.config();

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error("Usage: npx ts-node create-admin.ts <email> <password>");
  process.exit(1);
}

const mongoUri = process.env.MONGODB_URI as string;
if (!mongoUri) {
  console.error("MONGODB_URI is not set in .env");
  process.exit(1);
}

async function main() {
  await mongoose.connect(mongoUri);

  const exists = await Admin.findOne({ email });
  if (exists) {
    console.log("Admin already exists:", exists.email);
    process.exit(0);
  }

  const admin = await Admin.create({
    email,
    password,
    role: "admin",
    name: "Admin"
  });

  console.log("Admin created successfully:", admin.email);
  await mongoose.disconnect();
}

main().catch(err => {
  console.error("Error creating admin:", err);
  process.exit(1);
});
