import {
  Button,
  Fieldset,
  Group,
  Paper,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import React from "react";
import { ProfileImage } from "./ProfileImage";
import { PersonalInfoProps } from "../interfaces";
import { IconArrowRight } from "@tabler/icons-react";

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  imageForm,
  updateForm,
  handleNext
}) => {
  return (
    <>
      <Text fw="bold" size="lg">
        Update your personal information below
      </Text>
      <Group align="flex-start" mt="md" gap="xl" grow>
        <Paper w="50%" maw={400} p="md" withBorder>
          <ProfileImage imageForm={imageForm} />
        </Paper>
        <Paper w="auto" maw="100%" p="md" withBorder>
          <Fieldset legend="Personal Information" mb="md">
            <Group grow>
              <TextInput
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
                value={updateForm.values.firstName}
                onChange={updateForm.handleChange}
                onBlur={updateForm.handleBlur}
                error={
                  updateForm.touched.firstName && updateForm.errors.firstName
                }
              />
              <TextInput
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
                value={updateForm.values.lastName}
                onChange={updateForm.handleChange}
                onBlur={updateForm.handleBlur}
                error={
                  updateForm.touched.lastName && updateForm.errors.lastName
                }
              />
            </Group>
            <Group grow>
              <TextInput
                mt="sm"
                name="email"
                label="Email"
                placeholder="Enter your email"
                value={updateForm.values.email}
                onChange={updateForm.handleChange}
                onBlur={updateForm.handleBlur}
                error={updateForm.touched.email && updateForm.errors.email}
              />
              <TextInput
                mt="sm"
                name="phoneNumber"
                label="Phone Number"
                placeholder="Enter your phone number"
                value={updateForm.values.phoneNumber}
                onChange={updateForm.handleChange}
                onBlur={updateForm.handleBlur}
                error={
                  updateForm.touched.phoneNumber &&
                  updateForm.errors.phoneNumber
                }
              />
            </Group>
            <Textarea
              mt="sm"
              name="bio"
              label="Bio"
              placeholder="Enter your bio"
              value={updateForm.values.bio}
              onChange={updateForm.handleChange}
              onBlur={updateForm.handleBlur}
              error={updateForm.touched.bio && updateForm.errors.bio}
            />
          </Fieldset>
          <Fieldset legend="Social Links" mb="md">
            <Group grow>
              <TextInput
                name="gitHub"
                label="GitHub"
                placeholder="Enter your GitHub profile URL"
                value={updateForm.values.gitHub}
                onChange={updateForm.handleChange}
                onBlur={updateForm.handleBlur}
                error={updateForm.touched.gitHub && updateForm.errors.gitHub}
              />
              <TextInput
                name="linkedIn"
                label="LinkedIn"
                placeholder="Enter your LinkedIn profile URL"
                value={updateForm.values.linkedIn}
                onChange={updateForm.handleChange}
                onBlur={updateForm.handleBlur}
                error={
                  updateForm.touched.linkedIn && updateForm.errors.linkedIn
                }
              />
            </Group>
            <TextInput
              mt="sm"
              name="portfolio"
              label="Portfolio Website"
              placeholder="Enter your portfolio website URL"
              value={updateForm.values.portfolio}
              onChange={updateForm.handleChange}
              onBlur={updateForm.handleBlur}
              error={
                updateForm.touched.portfolio && updateForm.errors.portfolio
              }
            />
          </Fieldset>
        </Paper>
      </Group>
      <Group justify="flex-end" mt="md">
        <Button
          mt="md"
          radius="xl"
          rightSection={<IconArrowRight stroke={1.5} />}
          onClick={handleNext}
        >
          Next
        </Button>
      </Group>
    </>
  );
}; 
