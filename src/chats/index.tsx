import { useRef, useState } from 'react';
import {
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Group,
  Menu,
  Paper,
  rem,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import {
  IconDotsVertical,
  IconTrash,
  IconSend,
  IconVideo,
  IconPhone,
  IconMicrophone,
} from '@tabler/icons-react';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them';
}

const users = ['Mohammed', 'Zainab', 'Jane Doe'];

export const Chats: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState('Mohammed');
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<{ [user: string]: Message[] }>({
    Mohammed: [
      { id: 1, text: 'Hello, how can I help?', sender: 'them' },
      { id: 2, text: 'I need help with TypeScript.', sender: 'me' },
    ],
    Zainab: [],
    'Jane Doe': [],
  });

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: input,
        sender: 'me',
      };
      setMessages((prev) => ({
        ...prev,
        [selectedUser]: [...(prev[selectedUser] || []), newMessage],
      }));
      setInput('');
    }
  };

  const handleDeleteChat = () => {
    setMessages((prev) => ({
      ...prev,
      [selectedUser]: [],
    }));
  };

  return (
    <Box
      style={{
        height: 'calc(100vh - 64px)', 
        display: 'flex',
      }}
    >
      {/* Sidebar */}
      <Box
        w="30%"
        p="md"
        style={{
          borderRight: '1px solid #dee2e6',
          overflowY: 'auto',
        }}
      >
        <Text size="lg" fw={600} mb="md">
          Chats
        </Text>
        <Stack gap="xs">
          {users.map((user) => (
            <UnstyledButton
              key={user}
              onClick={() => setSelectedUser(user)}
              style={{
                backgroundColor: selectedUser === user ? '#228be6' : 'transparent',
                padding: rem(8),
                borderRadius: rem(8),
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar radius="xl" color="white" style={{background: '#228be6'}} size="md">
                {user[0]}
              </Avatar>
              <Text ml="sm">{user}</Text>
            </UnstyledButton>
          ))}
        </Stack>
      </Box>

      {/* Chat Section */}
      <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Group px="md" py="sm" justify="space-between" style={{ borderBottom: '1px solid #dee2e6' }}>
          <Group>
            <Avatar color="blue" radius="xl" size="lg">
              {selectedUser[0]}
            </Avatar>
            <Text size="lg" fw={600}>{selectedUser}</Text>
          </Group>

          <Group gap="xs">
            <ActionIcon variant="light"><IconPhone size={18} /></ActionIcon>
            <ActionIcon variant="light"><IconVideo size={18} /></ActionIcon>
            <Menu shadow="md" width={160}>
              <Menu.Target>
                <ActionIcon variant="subtle">
                  <IconDotsVertical size={18} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconTrash size={16} />}
                  color="red"
                  onClick={handleDeleteChat}
                >
                  Delete chat
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>

        {/* Messages */}
        <Box style={{ flex: 1, padding: '10px 16px', overflowY: 'auto' }}>
          <Stack>
            {(messages[selectedUser] || []).map((msg) => (
              <Paper
                key={msg.id}
                radius="lg"
                px="md"
                py="xs"
                style={{
                  maxWidth: '80%',
                  alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                  backgroundColor: msg.sender === 'me' ? '#228be6' : '#228be6',
                  
                }}
              >
                {msg.text}
              </Paper>
            ))}
            <div ref={messagesEndRef} />
          </Stack>
        </Box>

        {/* Input */}
        <Divider />
        <Group px="md" py="sm">
          <TextInput
            placeholder="Type your message..."
            radius="lg"
            style={{ flex: 1 }}
            size="xl"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          {input.trim() ? (
            <ActionIcon onClick={sendMessage} variant="filled" color="blue" size="xl">
              <IconSend size={24} />
            </ActionIcon>
          ) : (
            <ActionIcon variant="filled" color="blue" size="xl">
              <IconMicrophone size={24} />
            </ActionIcon>
          )}
        </Group>
      </Box>
    </Box>
  );
};
