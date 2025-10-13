
export type SecurityRuleContext = {
  path: string;
  operation: "get" | "list" | "create" | "update" | "delete";
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  public readonly context: SecurityRuleContext;
  public readonly cause: any; // The original server error

  constructor(
    context: SecurityRuleContext,
    options?: {
      cause?: any;
    }
  ) {
    const message = `Firestore Permission Denied: The following request was denied by Firestore security rules.\n\nContext:\n${JSON.stringify(
      context,
      null,
      2
    )}`;
    super(message);
    this.name = "FirestorePermissionError";
    this.context = context;
    this.cause = options?.cause;

    // This is to make the error message more readable in the console.
    Object.setPrototypeOf(this, FirestorePermissionError.prototype);
  }
}
