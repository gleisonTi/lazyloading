export interface Message {
  Id: string;
  Type: number;
  Description: string;
}

export interface Messages {
  Messages: Message[];
}
