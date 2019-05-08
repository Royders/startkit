import * as mongoose from 'mongoose';
export declare class Mongo {
    private URI;
    private config;
    createConnection(URI: any, config: any): Promise<mongoose.Connection>;
}
