
export interface Task {
  day: number;
  id: string;
  title: string;
  topic: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  link: string;
  xp: number;
}

export interface User {
  username: string;
  password?: string; // Password is used for registration, not stored in state
}

export interface ProgressData {
  [username: string]: string[]; // An array of completed task IDs
}
