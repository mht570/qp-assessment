// Define user interface
export interface User {
  id: string;
  username: string;
  role: UserRole;
}
//define Roles
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

// Mock database of users
export const users: User[] = [
  { id: "1", username: "admin", role: UserRole.ADMIN },
  { id: "2", username: "user1", role: UserRole.USER },
  { id: "3", username: "user2", role: UserRole.USER },
];
