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

export const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}