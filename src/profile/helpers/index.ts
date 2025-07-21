export const CapitalizeFirstLetter = (str: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const createSelectDegreeData = (degrees: object) => {
    return Object.entries(degrees).map(([value, label]) => ({
        value,
        label: CapitalizeFirstLetter(label),
    }));
}

export const cleanGraphQLInput = (input: any[]) => {
    return input.map(({ __typename, ...rest }) => rest);
}