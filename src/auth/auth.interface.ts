export interface AuthUser {
  id: string;
  email: string;
}

export interface JwtPayload {
  email: string;
  sub: string;
}
