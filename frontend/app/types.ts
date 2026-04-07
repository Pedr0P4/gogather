export type Step = 1 | 2 | 3;

export interface EventFormData {
  name: string;
  date: string;
  description: string;
}

export interface EventStop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}