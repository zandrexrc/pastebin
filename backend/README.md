# Pastebin - backend
Serverless API via Azure Functions connected to a Cosmos DB database.

## API
The pastebin API consists of two functions:
- **GetPaste**: Retrieves a specific paste document from the database
- **PostPaste**: Creates a new paste document in the database

These two functions are deployed in a Function app on Azure. 

### Responses
When successful, both functions return a *paste* object in the response body.   
A *paste* has the following attributes:
- **id**: an auto-generated unique id
- **pasteUrl**: a unique, random url for retrieving the paste
- **title**: a non-empty string representing the title of the paste
- **content**: a non-empty, pre-formatted string which is the main content of the paste
- **ttl**: (Time To Live) / an integer denoting the number of seconds the paste 
is stored in the database before being automatically deleted
- **_ts**: a number representing the epoch time for when the document was created
   
Upon encountering an error (e.g. paste not found, database connection failure), 
the response body consists of an *error* object:
- **status**: the HTTP status code of the response
- **title**: a short description of the error
- **detail**: a more detailed description of the error
- **type**: the category the error belongs in
- **instance**: the URL from which the request was sent


## Database
All pastes are saved in a Cosmos DB database.