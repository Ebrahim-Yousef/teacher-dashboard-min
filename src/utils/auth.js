import { users } from "../data/users";

export const loginUser = (username, password) => {
  const user = users.find(
    (item) => item.username === username && item.password === password,
  );

  return user || null;
};
