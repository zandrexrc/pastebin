interface AppConfig {
    cosmos_db_endpoint: string;
    cosmos_db_key: string;
}

const config: AppConfig = {
    cosmos_db_endpoint: '<your_cosmos_db_endpoint>',
    cosmos_db_key: '<your_cosmos_db_key>'
}

export default config;
