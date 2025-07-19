import { useState, ChangeEvent } from 'react';
import {
  Container,
  Grid,
  Card,
  Avatar,
  Title,
  Text,
  TextInput,
  Textarea,
  Button,
  Stack,
  Center,
  Group,
  ActionIcon,
  Divider,
  rem,
} from '@mantine/core';
import { IconPencil } from '@tabler/icons-react';

// Profile Data Interface
interface ProfileData {
  name: string;
  email: string;
  bio: string;
  skillToLearn: string;
  proficientSkill: string;
  linkedIn: string;
  github: string;
  education: string;
}

export default function ProfilePage() {
  // Profile state
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    email: '',
    bio: '',
    skillToLearn: '',
    proficientSkill: '',
    linkedIn: '',
    github: '',
    education: '',
  });

  // Edit mode toggles
  const [edit, setEdit] = useState({
    profile: false,
    skillToLearn: false,
    proficientSkill: false,
    bio: false,
    education: false,
  });

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    console.log('Profile saved:', profile);
  };

  return (
    <Container size="xl" px="md" style={{ minHeight: '100vh', paddingTop: '2rem' }}>
      <Grid gutter="xl">
        {/* Left Column */}
        <Grid.Col span={{ base: 12, md: 5 }}>
          {/* Profile Card */}
          <Card shadow="md" padding="xl" radius="md" withBorder style={{ position: 'relative' }}>
            <ActionIcon
              onClick={() => setEdit((prev) => ({ ...prev, profile: !prev.profile }))}
              variant="light"
              style={{ position: 'absolute', top: rem(10), right: rem(10), zIndex: 1 }}
              aria-label="Edit profile"
            >
              <IconPencil size={18} />
            </ActionIcon>

            <Center style={{ flexDirection: 'column' }} mb="md">
              <Avatar size={180} radius={90} color="blue">
                {(profile.name.charAt(0) || 'U').toUpperCase()}
              </Avatar>
              <Title mt="sm" order={2}>
                {profile.name || 'USER'}
              </Title>
            </Center>

            {/* Editable Form */}
            {edit.profile ? (
              <Stack gap="md">
                <TextInput label="Name" name="name" value={profile.name} onChange={handleChange} />
                <TextInput label="Email" name="email" value={profile.email} onChange={handleChange} />
                <TextInput label="LinkedIn" name="linkedIn" value={profile.linkedIn} onChange={handleChange} />
                <TextInput label="GitHub" name="github" value={profile.github} onChange={handleChange} />
                <Button fullWidth mt="sm" onClick={handleUpdate}>
                  Save
                </Button>
              </Stack>
            ) : (
              <Stack gap="xs" mt="md">
                <Text size="md">{profile.email || 'example@gmail.com'}</Text>
                <Divider />
                <Text size="sm" c="dimmed">LinkedIn: {profile.linkedIn || 'Not provided'}</Text>
                <Text size="sm" c="dimmed">GitHub: {profile.github || 'Not provided'}</Text>
              </Stack>
            )}
          </Card>

          {/* Bio Section */}
          <Card shadow="md" padding="xl" radius="md" withBorder mt="lg">
            <Group justify="space-between" mb="sm">
              <Title order={4}>Bio</Title>
              <Button
                size="xs"
                variant="light"
                onClick={() => {
                  if (edit.bio) handleUpdate();
                  setEdit((prev) => ({ ...prev, bio: !prev.bio }));
                }}
              >
                {edit.bio ? 'Save' : 'Edit'}
              </Button>
            </Group>

            {edit.bio ? (
              <Textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                minRows={3}
              />
            ) : (
              <Text>{profile.bio || 'No bio provided yet.'}</Text>
            )}
          </Card>
        </Grid.Col>

        {/* Right Column: Skills and Education */}
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Title mb="md">ABOUT</Title>

          {/* Proficient Skills */}
          <Card shadow="md" padding="xl" radius="md" withBorder mb="lg">
            <Group justify="space-between" mb="sm">
              <Title order={4}>Proficient Skills</Title>
              <Button
                size="xs"
                variant="light"
                onClick={() => {
                  if (edit.proficientSkill) handleUpdate();
                  setEdit((prev) => ({ ...prev, proficientSkill: !prev.proficientSkill }));
                }}
              >
                {edit.proficientSkill ? 'Save' : 'Edit'}
              </Button>
            </Group>

            {edit.proficientSkill ? (
              <Textarea
                name="proficientSkill"
                value={profile.proficientSkill}
                onChange={handleChange}
                placeholder="e.g., HTML, CSS, JavaScript"
                minRows={3}
              />
            ) : (
              <ul>
                {profile.proficientSkill.split(',').map((item, idx) => (
                  <li key={idx}>{item.trim()}</li>
                ))}
              </ul>
            )}
          </Card>

          {/* Skills to Learn */}
          <Card shadow="md" padding="xl" radius="md" withBorder mb="lg">
            <Group justify="space-between" mb="sm">
              <Title order={4}>Skills to Learn</Title>
              <Button
                size="xs"
                variant="light"
                onClick={() => {
                  if (edit.skillToLearn) handleUpdate();
                  setEdit((prev) => ({ ...prev, skillToLearn: !prev.skillToLearn }));
                }}
              >
                {edit.skillToLearn ? 'Save' : 'Edit'}
              </Button>
            </Group>

            {edit.skillToLearn ? (
              <Textarea
                name="skillToLearn"
                value={profile.skillToLearn}
                onChange={handleChange}
                placeholder="e.g., TypeScript, GraphQL..."
                minRows={3}
              />
            ) : (
              <ul>
                {profile.skillToLearn.split(',').map((item, idx) => (
                  <li key={idx}>{item.trim()}</li>
                ))}
              </ul>
            )}
          </Card>

          {/* Education */}
          <Card shadow="md" padding="xl" radius="md" withBorder>
            <Group justify="space-between" mb="sm">
              <Title order={4}>Educational Background</Title>
              <Button
                size="xs"
                variant="light"
                onClick={() => {
                  if (edit.education) handleUpdate();
                  setEdit((prev) => ({ ...prev, education: !prev.education }));
                }}
              >
                {edit.education ? 'Save' : 'Edit'}
              </Button>
            </Group>

            {edit.education ? (
              <TextInput
                name="education"
                value={profile.education}
                onChange={handleChange}
                placeholder="e.g., B.Sc. Computer Science, XYZ University"
              />
            ) : (
              <Text>{profile.education || 'Not provided yet.'}</Text>
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
