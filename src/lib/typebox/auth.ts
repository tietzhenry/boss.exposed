import { Type as t, type Static } from "@sinclair/typebox";

// Schema für das SignUp-Formular
export const signUpUser = t.Object({
  username: t.String({ minLength: 1, maxLength: 128 }),
  email: t.String({ format: "email" }), // E-Mail-Format validieren
  password: t.String({ minLength: 8, maxLength: 128 }) // Passwort sollte mindestens 8 Zeichen haben
});

// TypeScript-Typ für das SignUp-Schema
export type SignUpUser = Static<typeof signUpUser>;

// Schema für das SignIn-Formular
export const signInUser = t.Object({
  usernameOrEmail: t.String({ minLength: 1, maxLength: 128 }), // Benutzername oder E-Mail
  password: t.String({ minLength: 8, maxLength: 128 }) // Passwort
});

// TypeScript-Typ für das SignIn-Schema
export type SignInUser = Static<typeof signInUser>;