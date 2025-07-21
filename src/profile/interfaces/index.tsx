import { Skill, User } from "src/interfaces";

export interface AdditionalInfoProps {
  user?: User;
}

export interface AvailabilityProps {
  user?: User;
}

export interface EducationalInfoProps {
  user?: User;
}
export interface PersonalDetailsProps {
  user?: User;
}

export interface SkillSetProps {
  user?: User;
}

export interface SkillsFormProps {
  skill: string;
  setSkill: (value: string) => void;
  level: string;
  setLevel: (value: string) => void;
  addSkill: () => void;
}


export interface SkillsTableProps {
  skills?: Array<Skill | null>;
  addSkill?: () => void;
  remove: (index: number) => void;
}


export interface UpdateAditionalInfoProps {
  opened: boolean;
  onClose: () => void;
  user?: User;
}

export interface UpdateAvailabiltyModalProps {
  opened: boolean;
  onClose: () => void;
  user?: User;
}

export interface UpdateEducationModalProps {
  opened: boolean;
  onClose: () => void;
  user?: User;
}

export interface UpdatePersonalDetailsModalProps {
  opened: boolean;
  onClose: () => void;
  user?: User;
}

export interface UpdateProficientSkillsModalProps {
  opened: boolean;
  onClose: () => void;
  user?: User;
}

export interface UpdateSkillsToLearnModalProps {
  opened: boolean;
  onClose: () => void;
  user?: User;
}

export interface UpdateSkillsModalProps {
  opened: boolean;
  onClose: () => void;
}

