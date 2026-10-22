export type FieldErrors<Field extends string> = Partial<Record<Field, string[]>>;

export interface SignInState {
  success: boolean;
  error?: string;
  fieldErrors?: FieldErrors<"email" | "password">;
  // Set when the password was correct but the email isn't verified yet
  unverifiedEmail?: string;
}

export interface ResendVerificationState {
  success: boolean;
  message?: string;
  error?: string;
}

export type EmailVerificationResult = "verified" | "invalid" | "expired";

export interface SessionUser {
  name: string | null;
  email: string | null;
  image: string | null;
}
