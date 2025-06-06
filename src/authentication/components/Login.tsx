import { useState } from "react";
import { Paper, Stack, TextInput } from "@mantine/core";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Paper shadow="md" p="xl" w={500}>
            <Stack>
                <TextInput
                    size="md"
                    radius="md"
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                />
                <TextInput
                    size="md"
                    radius="md"
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                />
            </Stack>
        </Paper>
    )
}

export default Login;
