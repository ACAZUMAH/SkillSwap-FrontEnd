import { useState } from "react";
import { Conditional } from "src/components"
import { Paper, Stack, TextInput, Container, Button, PasswordInput } from "@mantine/core";
import { useRegisterForm } from "../hooks/useRegisterForm";

const Login: React.FC = () => {
    const [showOtp, setShowOtp] = useState(false);
    const form = useRegisterForm();

    // const handleSubmit = async () => {
    //     const created = await register({
    //         ...form.values,
    //     });
    //     if (created) {
    //         setShowOtp(true);
    //         form.resetForm();
    //     }
    // };

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
                        >
                            Login
                        </Button>
                    </Stack>
                </Conditional>
            </Paper>
        </Container>
    )
}

export default Login;
