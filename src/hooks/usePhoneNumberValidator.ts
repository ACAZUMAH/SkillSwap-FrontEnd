import { parsePhoneNumber } from "awesome-phonenumber";

export const usePhoneNumberValidator = () => {
    const title = "phone-number"
    const message = "Use a valid phone number. e.g., 0545678902"

    const validatePhoneNumber = (value: string | undefined) => {
        return parsePhoneNumber(value as string, { regionCode: "GH" }).valid
    };

    return { title, message, validatePhoneNumber };
}