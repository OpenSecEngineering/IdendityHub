type AuthUser = {
  id: string;
  email: string;
  isActive: boolean;
  emailVerifiedAt: Date | null;
  createdAt: Date;
};

export type AuthResponse = {
    user: AuthUser;
    accessToken: string;
};