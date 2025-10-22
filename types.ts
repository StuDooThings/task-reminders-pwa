
export interface Task {
  id: number;
  text: string;
  dueDate: string; // ISO 8601 string format
  isCompleted: boolean;
  notified?: boolean; // To track if a notification has been sent
}
