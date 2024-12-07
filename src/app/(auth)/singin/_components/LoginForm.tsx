"use client";
import React, { useState, useTransition } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

import { SignInSchema } from "../Schmea";
import { SignInValues } from "../types";
import { signIn } from "../action";
import LoadingButton from "@/components/ui/LoadingButton";
import { PasswordBtn } from "@/components/ui/PasswordBtn";

const LoginForm = () => {
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: () => SignInSchema,
    onSubmit: async (val: SignInValues) => {
      startTransition(async () => {
        setError("");
        const { error } = await signIn(val);
        if (error) setError(error);
      });
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      {error && (
        <p className="text-center text-destructive text-red-500">{error}</p>
      )}

      <div className="MailField my-3">
        <Input
          placeholder="Email..."
          name="email"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        {form.errors.email && form.touched.email && (
          <Alert className="bg-red-300 text-center font-bold mt-4 p-1 ">
            {form.errors.email}
          </Alert>
        )}
      </div>

      <div className="PasswordField my-3">
        <PasswordBtn
          placeholder="Password..."
          name="password"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        {form.errors.password && form.touched.password && (
          <Alert className="bg-red-300 text-center font-bold mt-4 p-1 ">
            {form.errors.password}
          </Alert>
        )}
      </div>
      <LoadingButton
        type="submit"
        disabled={!(form.isValid && form.dirty)}
        className="w-full"
        loading={isPending}
      >
        Submit
      </LoadingButton>
    </form>
  );
};

export default LoginForm;
