import React from "react";
import { DateInput } from "@mantine/dates";
import { Paper, Text, TextInput } from "@mantine/core";
import { EducationInfoProps } from "../interfaces";

export const EducationInfo: React.FC<EducationInfoProps> = ({ updateForm }) => {
  return (
    <>
      <Paper p="md" withBorder>
        <Text>
          Please provide your educational background. This information will help
          us understand your qualifications and areas of expertise.
        </Text>
        <TextInput
          mt="sm"
          withAsterisk
          name="institution"
          label="Institution"
          placeholder="Enter your instittution name"
          value={updateForm.values.institution}
          onChange={updateForm.handleChange}
          onBlur={updateForm.handleBlur}
          error={
            updateForm.touched.institution && updateForm.errors.institution
          }
        />
        <TextInput
          mt="sm"
          withAsterisk
          name="fieldOfStudy"
          label="Field of Study"
          placeholder="Enter your field of study"
          value={updateForm.values.fieldOfStudy}
          onChange={updateForm.handleChange}
          onBlur={updateForm.handleBlur}
          error={
            updateForm.touched.fieldOfStudy && updateForm.errors.fieldOfStudy
          }
        />
        <TextInput
          mt="sm"
          withAsterisk
          name="level"
          label="Lavel"
          placeholder="Enter your level"
          value={updateForm.values.level}
          onChange={updateForm.handleChange}
          onBlur={updateForm.handleBlur}
          error={updateForm.touched.level && updateForm.errors.level}
        />
        <TextInput
          mt="sm"
          withAsterisk
          name="degree"
          label="Degree"
          placeholder="Enter your degree"
          value={updateForm.values.degree}
          onChange={updateForm.handleChange}
          onBlur={updateForm.handleBlur}
          error={updateForm.touched.degree && updateForm.errors.degree}
        />
        <DateInput
          mt="sm"
          name="endDate"
          label="End Date"
          placeholder="Select end date"
          value={updateForm.values.endDate}
          onChange={(date) => {
            if (date) updateForm.setFieldValue("endDate", new Date(date));
          }}
          onBlur={updateForm.handleBlur}
          error={
            updateForm.touched.endDate && (updateForm.errors.endDate as string)
          }
          clearable
        />
      </Paper>
    </>
  );
};
