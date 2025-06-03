import { useState } from "react";
import { Paper, Stack, TextInput } from '@mantine/core';

const Register: React.FC = () => {
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Paper shadow="md" w={500}>
      <Stack>
        <TextInput
          size="md"
          radius="md"
          label="Username"
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
        />
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

export default Register;
