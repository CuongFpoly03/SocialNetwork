import express, { Application } from "express";
import path from "path";

class Statics {
  public static mount(_express: Application): Application {
    _express.use(express.json());
    _express.use(express.urlencoded({ extended: true }));
    _express.use(express.static(path.join(__dirname, "public")));

    return _express;
  } 
}

export default Statics;
