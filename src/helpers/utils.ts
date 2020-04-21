
export const camelCaseToNormal = (str: string) =>
  str.replace(/([A-Z])/g, ' $1').replace(/^./, str2 => str2.toUpperCase());

export const generateId = () => Math.random().toString(16).slice(-4);