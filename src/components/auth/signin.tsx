"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthHook } from "@/components/hooks/auth-hook";
import { useRouter } from "next/navigation";
import { InternalServerError } from "elysia";

export default function SignInForm() {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    staySignedIn: false,
  });

  const router = useRouter();

  const { signInMutation } = AuthHook();

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await signInMutation
      .mutateAsync({
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      })
      .then(() => {
        router.push("/dashboard");
        router.refresh();
      })
      .catch((error: InternalServerError) => {});
  };

  const isFormValid = formData.usernameOrEmail && formData.password;

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ position: "relative" }}
    >
      {/*<div
        style={{
          position: "absolute",
          top: "-3rem",
          right: "-3rem",
          height: "12rem",
          width: "12rem",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          filter: "blur(3rem)",
          borderRadius: "9999px",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-3rem",
          left: "-3rem",
          height: "12rem",
          width: "12rem",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          filter: "blur(3rem)",
          borderRadius: "9999px",
        }}
      />*/}
      <Card
        style={{
          maxWidth: "24rem",
          margin: "auto",
        }}
      >
        <CardHeader>
          <CardTitle
            style={{
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            Sign In
          </CardTitle>
          <CardDescription style={{ textAlign: "center" }}>
            Enter your username or email below to sign into your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: "1rem" }}
          >
            <div style={{ display: "grid", gap: "0.5rem" }}>
              <Label htmlFor="usernameOrEmail">Username or Email</Label>
              <Input
                id="usernameOrEmail"
                name="usernameOrEmail"
                type="text"
                placeholder="Username or m@example.com"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  style={{
                    marginLeft: "auto",
                    fontSize: "0.875rem",
                    textDecoration: "underline",
                  }}
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Mittig ausgerichtete Checkbox mit reduziertem Abstand */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "0.1rem",
              }}
            >
              <input
                id="staySignedIn"
                name="staySignedIn"
                type="checkbox"
                checked={formData.staySignedIn}
                onChange={handleChange}
                style={{ marginRight: "0.5rem" }} // Margin für die Checkbox
              />
              <Label htmlFor="staySignedIn" style={{ margin: 0 }}>
                Stay signed in
              </Label>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!isFormValid}
              style={{
                width: "100%",
              }}
            >
              Sign In
            </Button>
          </form>
          <div
            style={{
              marginTop: "1rem",
              textAlign: "center",
              fontSize: "0.875rem",
            }}
          >
            Don&apos;t have an account?{" "}
            <Link href="/signup" style={{ textDecoration: "underline" }}>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
