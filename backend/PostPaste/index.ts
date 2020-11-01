import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { nanoid } from "nanoid";
import { IPaste } from "../Models/IPaste";
import { IErrorDetails } from "../Models/IErrorDetails";
import { DatabaseOperationResult } from "../Models/DatabaseOperationResult";
import CosmosDBClient from "../CosmosDBClient";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Send error if request is invalid
    const reqIsValid = validateRequest(req);
    if (!reqIsValid) {
        const errorDetails: IErrorDetails = {
            title: "Bad request",
            detail: "Missing required fields (title, content)",
            status: 400,
            type: "/errors/invalid-request",
            instance: req.url
        };
        return handleError(errorDetails, context);
    }

    // Get paste details
    let pasteDocument = <IPaste>req.body;

    // Generate paste url for the document
    pasteDocument.pasteUrl = generatePasteUrl();

    // Add the document to the database
    const dbOperationResult = await addNewPaste(pasteDocument, req);

    // Handle error if failed to add document
    if (dbOperationResult.error) {
        return handleError(dbOperationResult.error, context);
    }

    context.res = {
        body: dbOperationResult.resource,
        status: 201
    };
};

// Create a document of the paste in the database
const addNewPaste = async (pasteDocument: IPaste, req: HttpRequest): Promise<DatabaseOperationResult> => {
    const client = new CosmosDBClient();
    let isSuccessful: boolean = true;
    let createdItem: object = null;
    let errorDetails: IErrorDetails = null;

    try {
        let { resource } = await client.container.items.create(pasteDocument);
        createdItem = resource;
    } catch (err) {
        isSuccessful = false;
        errorDetails = {
            title: "Could not create paste",
            detail: "Database operation failed",
            status: 500,
            type: "/errors/database-error",
            instance: req.url
        };
    } finally {
        return new DatabaseOperationResult(isSuccessful, createdItem, errorDetails);
    }
}

// Generate a random unique url for the paste
const generatePasteUrl = (): string => {
    const URL_LENGTH = 10;
    const url = nanoid(URL_LENGTH);
    return url;
}

// Check if the request is missing paste title or content
const validateRequest = (req: HttpRequest): boolean => {
    const data = req.body;
    return (
        data.title && data.title.trim().length > 0 &&
        data.content && data.content.trim().length > 0
    );
}

// Set error in the response
const handleError = (error: IErrorDetails, context: Context) => {
    context.res = {
        body: { error: error },
        status: error.status,
    };
}

export default httpTrigger;