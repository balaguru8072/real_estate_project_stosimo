export const randomCode = () => {
  return Math.random().toString(36).substring(2, 8);
};

export const withRandomPath = (path) => {
  return `${path}/${randomCode()}`;
};