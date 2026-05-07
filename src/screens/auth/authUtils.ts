export const buildAuthEmail = (username: string) =>
  `${username.toLowerCase().trim()}@quackies.local`;
