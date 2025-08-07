import { CapitalizeFirstLetter } from "src/helpers";

export const createSelectDegreeData = (degrees: object) => {
    return Object.entries(degrees).map(([value, label]) => ({
        value,
        label: CapitalizeFirstLetter(label),
    }));
}

export const cleanGraphQLInput = (input: any[]) => {
    return input.map(({ __typename, ...rest }) => rest);
}
