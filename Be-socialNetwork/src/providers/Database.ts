import mongosee, { MongooseError } from 'mongoose';
import Locals from './Local';
class Database {
    public static init():any {
        mongosee.connect(Locals.config().mongo_url)
        .then(() => console.log("MongoDB connected"))
        .catch((error: MongooseError) => {
            console.log(error);
            throw error;
        })
    }
}


export default Database;