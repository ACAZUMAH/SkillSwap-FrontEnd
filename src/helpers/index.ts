export const CapitalizeFirstLetter = (str: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getInitialsNameLatter = (name: string): string => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }
  return `${names[0].charAt(0).toUpperCase()}${names[names.length - 1].charAt(0).toUpperCase()}`;
}

const levelOptions = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Advanced'
}

export const createSelectData = (obj: object) => {
  return Object.entries(obj).map(([value, label]) => ({
    value,
    label
  }));
}

export const leveldata = createSelectData(levelOptions);