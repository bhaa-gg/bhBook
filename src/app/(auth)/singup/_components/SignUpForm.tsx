"use client";
import React, { useState, useTransition } from "react";
import { SignUpSchema } from "../Schema";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

import { signUp } from "../action";
import { SignUpValues } from "../types";
import LoadingButton from "@/components/ui/LoadingButton";
import { PasswordBtn } from "@/components/ui/PasswordBtn";

const SignUpForm = () => {
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const form = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: () => SignUpSchema,
    onSubmit: async (val: SignUpValues) => {
      startTransition(async () => {
        setError("");
        const { error } = await signUp(val);
        if (error) setError(error);
      });
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      {error && (
        <p className="text-center text-destructive text-red-500">{error}</p>
      )}
      <div className="nameField my-3">
        <Input
          placeholder="Name..."
          name="name"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        {form.errors.name && form.touched.name && (
          <Alert className="bg-red-300 text-center font-bold mt-4 p-1 ">
            {form.errors.name}
          </Alert>
        )}
      </div>

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
      <div className="RePasswordField my-3">
        <PasswordBtn
          placeholder="RePassword..."
          name="rePassword"
          onChange={form.handleChange}
          onBlur={form.handleBlur}
        />
        {form.errors.rePassword && form.touched.rePassword && (
          <Alert className="bg-red-300 text-center font-bold mt-4 p-1 ">
            {form.errors.rePassword}
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

export default SignUpForm;
