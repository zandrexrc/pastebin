import { IErrorDetails } from "./IErrorDetails";

interface IDatabaseOperationResult {
    isSuccessful: boolean;
    error?: IErrorDetails;
}

class DatabaseOperationResult {
    isSuccessful: boolean;
    resource: object = null;
    error: IErrorDetails = null;

    constructor (isSuccessful: boolean, resource: object, errorDetails: IErrorDetails) {
        this.isSuccessful = isSuccessful;
        this.resource = resource;

        if (!this.isSuccessful) {
            this.error = errorDetails;
        }
    }
}

export { IDatabaseOperationResult, DatabaseOperationResult };