export type FieldErrors<Field extends string> = Partial<Record<Field, string[]>>;

export interface SignInState {
  success: boolean;
  error?: string;
  fieldErrors?: FieldErrors<"email" | "password">;
}

export interface SessionUser {
  name: string | null;
  email: string | null;
  image: string | null;
}
