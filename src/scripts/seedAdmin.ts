import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
  try {
    const adminData = {
      name: "Admin Khan",
      email: "admin@gmail.com",
      role: UserRole.ADMIN,
      password: "admin1234",
    };

    const existsUser = await prisma.user.findUnique({
      where: {
        email: adminData.email,
      },
    });

    if (existsUser) {
      throw new Error("User already exists!!");
    }

    const signupAdmin = await fetch(
      "http://localhost:5001/api/auth/sign-up/email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminData),
      }
    );

    if (signupAdmin.ok) {
      await prisma.user.update({
        where: {
          email: adminData.email,
        },
        data: {
          emailVerified: true,
        },
      });
    }

    console.log("Admin seeded successfully");
  } catch (err: any) {
    console.error(err);
  }
}

seedAdmin();
