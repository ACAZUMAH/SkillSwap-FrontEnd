import { useState } from "react";
import { Conditional } from "src/components";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { getPhoneNumberWithCode } from "src/helpers/phone-numbers";
import { Paper, Stack, TextInput, Container, Button, PasswordInput } from "@mantine/core";
import { VerifyOtp } from "./VerifyOtp";

const Login: React.FC = () => {
    const form = useRegisterForm();
    const [showOtp, setShowOtp] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("")

    const handleSubmit = async () => {
        const created = await login({
            ...form.values,
            phoneNumber: getPhoneNumberWithCode(form.values.phoneNumber),
        });
        if (created) {
            setPhoneNumber(form.values.phoneNumber);
            setShowOtp(true);
            form.resetForm();
        }
    };

    return (
        <Container size="x5">
            <Paper shadow="md" p="xl" w={500} withBorder>
                <Conditional condition={!showOtp}>
                    <Stack gap="sm" w={400} mx="auto">
                        <TextInput
                            size="md"
                            radius="xl"
                            name="phoneNumber"
                            label="Phone Number"
                            placeholder="Enter Phone Number"
                            value={form.values.phoneNumber}
                            onChange={form.handleChange}
                        />
                        <PasswordInput
                            size="md"
                            radius="xl"
                            name="password"
                            label="Password"
                            placeholder="Enter password"
                            value={form.values.password}
                            onChange={form.handleChange}
                            error={form.errors.password}
                        />
                        <Button
                            size="md"
                            radius="xl"
                            mt="md"
                            disabled={!form.isValid}
                            onClick={handleSubmit}
                        >
                            Login
                        </Button>
                    </Stack>
                </Conditional>
                <Conditional condition={showOtp}>
                    <VerifyOtp phoneNumber={phoneNumber} />
                </Conditional>
            </Paper>
        </Container>
    )
}

export default Login;
