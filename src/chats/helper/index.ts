import { Message, MessagesStatus } from "src/interfaces";

export const createMessageStatus = (message: Message) => {
  if (message.status === MessagesStatus.Delivered) {
    return "Delivered";
  } else if (message.status === MessagesStatus.Read) {
    return "Read";
  } else {
    return "Sent";
  }
};
