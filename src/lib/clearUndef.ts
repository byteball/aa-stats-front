export const cleanUndef = <T extends Record<string, unknown>>(obj: T): void => {
  if (Array.isArray(obj)) {
    obj.forEach((item) => cleanUndef(item));
    return;
  }
  if (typeof obj === 'object' && !Array.isArray(obj) && obj != null) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] == null) {
        delete obj[key];
      } else if (
        !(
          typeof obj[key] === 'string' ||
          typeof obj[key] === 'number' ||
          typeof obj[key] === 'boolean'
        )
      ) {
        cleanUndef(obj[key] as Record<string, unknown>);
      }
    });
  }
};
