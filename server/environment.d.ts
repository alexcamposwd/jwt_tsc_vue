declare namespace NodeJS {
    export interface ProcessEnv {
        PORT?: String;
        NODE_ENV: 'development' | 'production';
        MONGO_URI: String;
    }
}