"use client";
import React, { FormEvent, useState } from "react";
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
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthHook } from "@/components/hooks/auth-hook";
import { InternalServerError } from "elysia";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { signUpMutation } = AuthHook();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tosAccepted, setTosAccepted] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }    
    await signUpMutation
      .mutateAsync({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then(() => {
        router.push("/dashboard");
        router.refresh();
      })
      .catch((error: any) => {
        console.error("Sign-up error:", error);
        alert(error?.message || "An error occurred during registration");
      });  };

  const isFormValid =
    formData.username &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    tosAccepted;

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ position: "relative" }}
    >
      <Card
        style={{
          maxWidth: "24rem",
          width: "100%",
          padding: "1rem",
        }}
      >
        <CardHeader>
          <CardTitle style={{ fontSize: "1.5rem", textAlign: "center" }}>
            Sign Up
          </CardTitle>
          <CardDescription style={{ textAlign: "center" }}>
            Enter your details below to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              <Label htmlFor="password">Password</Label>
              <div style={{ position: "relative" }}>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "0.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "gray",
                  }}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div style={{ position: "relative" }}>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    right: "0.5rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "gray",
                  }}
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '0.5rem' }}>
              <input
                id="tos"
                type="checkbox"
                checked={tosAccepted}
                onChange={(e) => setTosAccepted(e.target.checked)}
                required
                style={{ marginRight: '0.5rem' }}
              />
              <Label htmlFor="tos" style={{ margin: 0 }}>
                I accept the{" "}
                <Link href="/tos" style={{ textDecoration: 'underline' }}>
                  Terms of Service
                </Link>
              </Label>
            </div>
            <Button
              type="submit"
              disabled={!isFormValid}
              style={{
                width: '100%',
              }}
            >
              Sign Up
            </Button>
          </form>
          <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>
            Already have an account?{" "}
            <Link href="/signin" style={{ textDecoration: 'underline' }}>
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}