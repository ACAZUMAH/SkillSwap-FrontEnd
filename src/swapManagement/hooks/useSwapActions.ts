import { useState } from "react";
import { SwappedSkillInput, User, Swap } from "src/interfaces";

interface Users {
  sender: User;
  receiver: User;
}

export const useAddSkillsExchangeActions = ({ sender, receiver }: Users) => {
  const [senderSkills, setSenderSkills] = useState<SwappedSkillInput[]>([]);
  const [receiverSkills, setReceiverSkills] = useState<SwappedSkillInput[]>([]);

  const addSenderSkills = (selectedValues: string[]) => {
    const availableSkills = sender.skillsProficientAt?.filter(
      (skill) => skill != null
    );

    const skillData: SwappedSkillInput[] = selectedValues.map((value) => {
      const skill = availableSkills?.find((s) => s.name === value);
      return {
        By: sender?.id!,
        name: skill?.name!,
        level: skill?.level!,
      };
    });
    setSenderSkills(skillData);
  };

  const addReceiverSkills = (selectedValues: string[]) => {
    const availableSkills = receiver.skillsProficientAt?.filter(
      (skill) => skill != null
    );

    const skillData: SwappedSkillInput[] = selectedValues.map((value) => {
      const skill = availableSkills?.find((s) => s.name === value);
      return {
        By: receiver?.id!,
        name: skill?.name!,
        level: skill?.level!,
      };
    });
    setReceiverSkills(skillData);
  };

  return {
    senderSkills,
    receiverSkills,
    addSenderSkills,
    addReceiverSkills,
    setSenderSkills,
    setReceiverSkills,
  };
};

export const useCalendarActions = (data: Swap) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getSessionsForDate = (date: Date) => {
    return data?.sessions?.filter(
      (session) =>
        new Date(session?.date).toDateString() === date.toDateString()
    );
  };

  const getTimetableForDay = (dayOfWeek: string) => {
    return data?.timeTable?.filter(
      (entry) => entry?.dayOfweek.toLowerCase() === dayOfWeek.toLowerCase()
    );
  };

  return {
    selectedDate,
    setSelectedDate,
    getSessionsForDate,
    getTimetableForDay,
  };
};
