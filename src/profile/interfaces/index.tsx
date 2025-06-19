import {
  useProfileImageform,
  useUpdateProfileForm,
} from "../hooks/useUpdateProfileForm";

export interface UpdateProfileModalProps {
  opened: boolean;
  onClose: () => void;
}

export interface PersonalInfoProps {
  imageForm: ReturnType<typeof useProfileImageform>;
  updateForm: ReturnType<typeof useUpdateProfileForm>;
  handleNext?: () => void;
}

export interface ProfileImageProps {
  imageForm: ReturnType<typeof useProfileImageform>;
}

export interface UpdateSkillSetProps {
  updateForm: ReturnType<typeof useUpdateProfileForm>;
  handlePrevious?: () => void;
  handleNext?: () => void;
}

export interface EducationInfoProps {
  updateForm: ReturnType<typeof useUpdateProfileForm>;
}
