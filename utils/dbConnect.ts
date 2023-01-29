/* This is a database connection function*/
import mongoose from "mongoose";
import { ProductSchema } from "../models/Product";
import { ReviewSchema } from "../models/Review";

//import the data models
let connection = {}; /* creating connection object*/
let dataConnection = {}; /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  //@ts-ignore
  if (connection.isConnected) {
    return;
  } else {
    /* connecting to our database */
    //@ts-ignore
    const db = await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
      autoIndex: false, //change to true to generate indexes
    });

    mongoose.set("debug", false); //change to true to log mongoose queries
    //@ts-ignore
    connection.isConnected = db.connections[0].readyState;
  }
}

export const dataDbConnection = async () => {
  return new Promise(async (res, rej) => {
    //@ts-ignore
    if (dataConnection._readyState === 1) {
      console.log("dataDB connection exists");
      res(dataConnection);
    } else {
      console.log("dataDB connection does not exist");
      /* connecting to our database */

      dataConnection = await mongoose.createConnection(
        //@ts-ignore
        process.env.MONGODB,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          autoIndex: false, //change to true to generate indexes
        }
      );

      console.log("dataDB connection created");

      //@ts-ignore
      await dataConnection.model("Product", ProductSchema);
      //@ts-ignore
      await dataConnection.model("Review", ReviewSchema);

      res(dataConnection);
    }
  });
};

export default dbConnect;
