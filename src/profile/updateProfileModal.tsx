import { Modal, Stepper } from "@mantine/core";
import React from "react";
import { UpdateProfileModalProps } from "./interfaces";
import { PersonalInfo } from "./components/PesonalInfo";
import {
  useProfileImageform,
  useUpdateProfileForm,
} from "./hooks/useUpdateProfileForm";
import { useAppAuthentication } from "src/hooks";
import { OtherInfo } from "./components/OtherInfo";

export const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({
  opened,
  onClose,
}) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const { user } = useAppAuthentication();
  const profileImageForm = useProfileImageform();
  const updateForm = useUpdateProfileForm(user);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Update Your Profile"
      size="80%"
    >
      <Stepper active={activeTab}>
        <Stepper.Step
          label="Profile"
          description="Update your personal information"
        >
          <PersonalInfo
            imageForm={profileImageForm}
            updateForm={updateForm}
            handleNext={() => setActiveTab(1)}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Skills"
          description="Update your skills and interests"
        >
          <OtherInfo
            updateForm={updateForm}
            handleNext={() => setActiveTab(2)}
            handlePrevious={() => setActiveTab(0)}
          />
        </Stepper.Step>
        <Stepper.Step
          label="Review"
          description="Review and submit changes"
        ></Stepper.Step>
      </Stepper>
    </Modal>
  );
};
