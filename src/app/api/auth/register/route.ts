import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { registerSchema } from "@/lib/auth-schemas";
import { createUser, getUserByEmail } from "@/lib/db/users";
import { hashPassword } from "@/lib/password";

const EMAIL_TAKEN_ERROR = "An account with this email already exists";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid registration details",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, password } = parsed.data;

  try {
    if (await getUserByEmail(email)) {
      return NextResponse.json({ success: false, error: EMAIL_TAKEN_ERROR }, { status: 409 });
    }

    const user = await createUser({ name, email, password: await hashPassword(password) });
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    // Another request registered the same email between the check and the insert
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ success: false, error: EMAIL_TAKEN_ERROR }, { status: 409 });
    }
    console.error("Registration failed:", error);
    return NextResponse.json({ success: false, error: "Registration failed" }, { status: 500 });
  }
}
