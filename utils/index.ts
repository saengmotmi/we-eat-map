export const isFullObject = (obj: Object): boolean => {
  return !!Object.keys(obj).length;
};

export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
