
import { EventEmitter } from "events";
import { FirestorePermissionError } from "./errors";

type Events = {
  "permission-error": (error: FirestorePermissionError) => void;
};

// We need to declare the augmentation of the EventEmitter class
declare interface ErrorEmitter {
  on<U extends keyof Events>(event: U, listener: Events[U]): this;
  emit<U extends keyof Events>(event: U, ...args: Parameters<Events[U]>): boolean;
}

class ErrorEmitter extends EventEmitter {}

export const errorEmitter = new ErrorEmitter();
