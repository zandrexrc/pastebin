interface AppConfig {
    frontend_url: string,
    backend_url: string;
    get_paste_function_key: string;
    post_paste_function_key: string;
}

const config: AppConfig = {
    frontend_url: '<the url for your react app>',
    backend_url: '<the url for your azure function api>',
    get_paste_function_key: '<the function key for the GetPaste function>',
    post_paste_function_key: '<the function key for the PostPaste function>'
}

export default config;
