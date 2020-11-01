import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { IErrorDetails } from "../Models/IErrorDetails";
import { DatabaseOperationResult } from "../Models/DatabaseOperationResult";
import CosmosDBClient from "../CosmosDBClient";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // Get paste url
    const pasteUrl = req.params.pasteUrl || "";
    
    // Retrieve paste from db
    const dbOperationResult = await retrievePaste(pasteUrl, req);

    // Send error if failed to retrieve paste
    if (dbOperationResult.error) {
        return handleError(dbOperationResult.error, context);
    }

    context.res = {
        body: dbOperationResult.resource
    };
};

// Retrieve document from the database
const retrievePaste = async (pasteUrl: string, req: HttpRequest): Promise<DatabaseOperationResult> => {
    const client = new CosmosDBClient();
    let isSuccessful: boolean = true;
    let errorDetails: IErrorDetails = null;
    let paste: object = null;

    try {
        const query = await client.container.items.query(`
            SELECT * 
            FROM pastes p 
            WHERE p.pasteUrl = '${pasteUrl}'
            `).fetchAll();
        
        paste = query.resources[0];

        // Send a 404 error if no paste was found
        if (!paste) {
            isSuccessful = false;
            errorDetails = {
                title: "Paste not found",
                detail: "Could not find a paste matching the given pasteUrl",
                status: 404,
                type: "/errors/paste-not-found",
                instance: req.url
            }
        }
    } catch (err) {
        isSuccessful = false;
        errorDetails = {
            title: "Could not retrieve paste",
            detail: "Database operation failed",
            status: 500,
            type: "/errors/database-error",
            instance: req.url
        };
    } finally {
        return new DatabaseOperationResult(isSuccessful, paste, errorDetails);
    }
}

// Set error in the response
const handleError = (error: IErrorDetails, context: Context) => {
    context.res = {
        body: { error: error },
        status: error.status,
    };
}

export default httpTrigger;