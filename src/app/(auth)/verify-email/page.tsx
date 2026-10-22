import type { Metadata } from "next";
import Link from "next/link";
import { MailCheck } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Verify your email",
};

export default function VerifyEmailPage() {
  return (
    <Card className="[--card-spacing:--spacing(6)]">
      <CardHeader className="justify-items-center text-center">
        <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailCheck className="size-6" aria-hidden />
        </div>
        <CardTitle className="text-xl">Check your email</CardTitle>
        <CardDescription>
          Account created. Check your email for a link to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-center text-sm text-muted-foreground">
          The link expires in 24 hours. Didn&apos;t get it? Sign in to send a new one.
        </p>
        <Link href="/sign-in" className={buttonVariants({ size: "lg", className: "w-full" })}>
          Back to sign in
        </Link>
      </CardContent>
    </Card>
  );
}
