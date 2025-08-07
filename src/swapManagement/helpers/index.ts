import { CapitalizeFirstLetter } from "src/helpers";
import { ScheduleStatus, Status } from "src/interfaces";

export const getStatusColor = (status: string) => {
  switch (status) {
    case Status.Pending:
      return "yellow";
    case Status.Accepted:
      return "green";
    case Status.Declined:
      return "red";
    case Status.Completed:
      return "blue";
    case ScheduleStatus.Scheduled:
      return "blue";
    case ScheduleStatus.Cancelled:
      return "red";
    default:
      return "gray";
  }
};

export const createSelectSkillsData = (skills?: any) => {
  return skills?.map((skill: any) => ({
    value: skill.name,
    label: CapitalizeFirstLetter(skill.name),
  }));
};
