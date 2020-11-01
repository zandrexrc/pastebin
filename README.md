# Pastebin
A study into Azure cloud services and serverless applications.
   
My primary goal with this project was to get practical experience with some of 
Azure's most used services. I decided on using Cosmos DB for the database, and 
Azure Functions to create a serverless REST API. The frontend part of the app is 
hosted as a static website on Azure Blob Storage.

The idea behind the app is simple (and highly unoriginal) -- it is a tool for 
sharing plain text or source code to other people online. Chances are you 
might have already used [pastebin.com](https://pastebin.com) or 
[Ubuntu pastebin](https://paste.ubuntu.com) in the past. This app is similar -- 
you post a paste anonymously, and share the link to whoever you want to show 
the paste to.

The app is publicly available at 
[pastebin-zandrexrc.azureedge.net](https://pastebin-zandrexrc.azureedge.net). 
> Feel free to use the app liberally, but please, PLEASE, don't abuse it -- 
> I'm using a Free Tier Cosmos DB account and cannot afford heavy traffic :)


## Azure
Here is a list of the services that I have used in creating the app:
- [Functions](https://azure.microsoft.com/en-us/services/functions/)
- [Cosmos DB](https://azure.microsoft.com/en-us/services/cosmos-db/)
- [Blob storage](https://azure.microsoft.com/en-us/services/storage/blobs/)
- [Azure CDN](https://azure.microsoft.com/en-us/services/cdn/)


## References
Here are some guides that helped me a lot in developing the app:
- [Cosmos DB quickstart tutorial with Node.js](https://docs.microsoft.com/en-us/azure/cosmos-db/create-sql-api-nodejs)
- [Functions quickstart using Visual Studio Code](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-vs-code?pivots=programming-language-javascript)
- [Hosting a static website on Blob Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website-host)
- [Creating an Azure CDN endpoint](https://docs.microsoft.com/en-us/azure/cdn/cdn-create-new-endpoint)
- [Fixing SPA routes with Azure CDN](https://stackoverflow.com/questions/59072306/hosting-spa-with-static-website-option-on-azure-blob-storage-clean-urls-and-dee)