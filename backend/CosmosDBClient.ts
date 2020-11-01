import { CosmosClient, Database, Container } from '@azure/cosmos';
import config from './config';

const endpoint = config.cosmos_db_endpoint;
const key = config.cosmos_db_key;

export default class CosmosDBClient {
    client: CosmosClient;
    database: Database;
    container: Container;

    constructor (
        database: string = "pastebin",
        collection: string = "pastes"
    ) {
        this.client = new CosmosClient({ endpoint, key });
        this.database = this.client.database(database);
        this.container = this.database.container(collection);
    }
}