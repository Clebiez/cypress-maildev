import { Address } from "./Address";

export type Email = {
  id: string;
  subject: string;
  time: string;
  to: Address[];
  from: Address[];
  text: string;
  html: string;
  read: boolean;
  messageId: string;
  priority: string;
  headers: { [key: string]: string };
  envelope: {
    from: string;
    to: string[];
    host: string;
    remoteAddress: string;
  };
};
