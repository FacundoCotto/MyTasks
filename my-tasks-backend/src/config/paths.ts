export const AUTH_ROUTES = {
  register: "/register",
  login: "/login",
  verify2FA: "/verify2FA",
  refreshToken: "/refresh-token",
}

export const TASK_ROUTES = {
  create: "/",
  list: "/user/:userId",
  details: "/:id",
  update: "/:id",
  delete: "/:id",
};

export const ADMIN_ROUTES = {
  createUser: "/",
  getUsers: "/users",
  getUser: "/:id",
  updateUser: "/:id",
  deleteUser: "/:id",
};