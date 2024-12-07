"use client";
import { PasswordBtn } from "@/components/ui/PasswordBtn";
import React, { useState, useTransition } from "react";
import { ChangePassSchema } from "../Schema";
import { useFormik } from "formik";
import LoadingButton from "@/components/ui/LoadingButton";
import { Alert } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { ChangePassInterface, changePasswordUser } from "../actions";

const ChangeUserPassword = () => {
  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const onSupmit = async (data: ChangePassInterface) => {
    setError("");
    startTransition(async () => {
      const { error, message } = await changePasswordUser(data);
      if (error) {
        setError(message);
        return;
      }
      toast({
        description: message,
      });
    });
  };

  const form = useFormik({
    initialValues: {
      oldPass: "",
      newPass: "",
    },
    validationSchema: () => ChangePassSchema,
    onSubmit: async (data: ChangePassInterface) => {
      onSupmit(data);
    },
  });

  return (
    <>
      {error && (
        <p className="text-center text-destructive text-red-500">{error}</p>
      )}
      <form onSubmit={form.handleSubmit}>
        <div className="oldPass my-5 ">
          <label>Old Password</label>
          <PasswordBtn
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="old Password..."
            name="oldPass"
          />
          {form.errors.oldPass && form.touched.oldPass && (
            <Alert className="bg-red-300 text-center font-bold mt-4 p-1 ">
              {form.errors.oldPass}
            </Alert>
          )}
        </div>
        <div className="NewPass my-5 ">
          <label>New Password</label>
          <PasswordBtn
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            placeholder="New Password..."
            name="newPass"
          />
          {form.errors.newPass && form.touched.newPass && (
            <Alert className="bg-red-300 text-center font-bold mt-4 p-1 ">
              {form.errors.newPass}
            </Alert>
          )}
        </div>
        <LoadingButton
          type="submit"
          disabled={!(form.isValid && form.dirty)}
          className="w-full"
          loading={isPending}
        >
          Change
        </LoadingButton>
      </form>
    </>
  );
};

export default ChangeUserPassword;
