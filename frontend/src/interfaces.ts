export interface User {
  id: number;
  name: string;
  email: string;
}

export interface State {
  token: string | null;
  errorMessage: string;
  user: User | null;
}
