import { Button, PasswordInput, TextInput } from "@mantine/core";
import React from "react";
import { useResetPasswordForm } from "../hooks/useResetPasswordForm";
import { useResetPasswordMutation } from "../hooks/useResetPasswordMutation";
import { getPhoneNumberWithCode } from "src/helpers/phone-numbers";

interface ResetPasswordFormProps {
  form: ReturnType<typeof useResetPasswordForm>;
  setVerifyOtp: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  form,
  setVerifyOtp,
}) => {
  const { resetPasswordHandler, loading } = useResetPasswordMutation();

  const handlesubmit = async () => {
    const res = await resetPasswordHandler({
      phoneNumber: getPhoneNumberWithCode(form.values.accountNumber),
      newPassword: form.values.confirmNewPassword,
    });

    if (res) {
      form.resetForm();
      setVerifyOtp();
    }
  };

  return (
    <>
      <TextInput
        mb="md"
        c="dimmed"
        radius="xl"
        withAsterisk
        label="Enter Account Number"
        name="accountNumber"
        placeholder="Enter account number"
        value={form.values.accountNumber}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.touched.accountNumber && form.errors.accountNumber}
      />
      <PasswordInput
        mb="md"
        c="dimmed"
        radius="xl"
        withAsterisk
        label="Enter New Password"
        name="newPassword"
        type="password"
        placeholder="Enter new password"
        value={form.values.newPassword}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={form.touched.newPassword && form.errors.newPassword}
      />
      <PasswordInput
        mb="md"
        c="dimmed"
        radius="xl"
        withAsterisk
        label="Confirm New Password"
        name="confirmNewPassword"
        type="password"
        placeholder="Confirm new password"
        value={form.values.confirmNewPassword}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        error={
          form.touched.confirmNewPassword && form.errors.confirmNewPassword
        }
      />
      <Button
        mt="lg"
        fullWidth
        radius="xl"
        loading={loading}
        onClick={handlesubmit}
        disabled={!form.isValid}
      >
        Reset Password
      </Button>
    </>
  );
};
