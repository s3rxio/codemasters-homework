export interface AuthDto {
  username: string;
  code: string;
}

export type AuthResponse = {
  token: string;
};
