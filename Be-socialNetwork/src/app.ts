import Database from "./providers/Database";
import express from "./providers/Express";

class index {
    public loadDatabase() {
        Database.init();
    }
    public loadServer() {
        express.init();
    }
}

(new index).loadServer();
(new index).loadDatabase();
