var express = require("express");
var Mongoose = require("mongoose").Mongoose;
var app = express();
const dbConnectionsModel = require("./dbConnections.model");
const CircularJSON = require("circular-json");

app.post("/", connectToDB);

let DB_INSTANCE_1 = null; //global variable to hold the instance of the database

app.post("/read", readFromDB);

const promiseConnect = (url) => {
  return new Promise((resolve, reject) => {
    var instance1 = new Mongoose();
    instance1.connect(url, { useNewUrlParser: true }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        // resolve(res);
        resolve(instance1);
      }
    });
  });
};

const promiseConnectMongoClient = (url) => {
  return new Promise((resolve, reject) => {
    //use MongoClient to connect to the database
    const MongoClient = require("mongodb").MongoClient;
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        reject(err);
      } else {
        // resolve(res);
        resolve(client);
      }
    });
  });
};

const queryDB = async (instanceObj, collectionName, query) => {
  try{

    return new Promise((resolve, reject) => {
      // const db = instanceObj.connection.db;     //  let _resp = await instance1.connection.db.collection("users").find({}).toArray();
      query = "find({}).lean().exec()";
  
      instanceObj = JSON.parse(instanceObj);
  
      const queryTORun = `instanceObj.connection.db.collection("${collectionName}").${query}`;
  
      resolve(eval(queryTORun));
    });
  }

  // db.eval(queryTORun, (err, resp) => {
  //   if (err) {
  //     reject(err);
  //   } else {
  //     resolve(resp);
  //   }
  // });
  // });
};

async function connectToDB(req, res) {
  try {
    console.log("connectToDB");
    //connect to the database
    //find inside the dbConnections collection the record with the name of the database
    //if the record is found, then connect to the url given in it and then populate the instanceObj with the moongoose instance

    const data = await dbConnectionsModel.findOne({ id: req.body.id }).lean().exec();
    if (data) {
      //connect to the database
      //populate the instanceObj with the mongoose instance
      //return the instanceObj

      // var instance1 = new Mongoose();

      // await instance1.connect(data.url);
      const instance1 = await promiseConnect(data.url);
      DB_INSTANCE_1 = instance1;
      //  const instance1 =  await promiseConnectMongoClient(data.url);

      //connect to instance1 and read the data
      //  let _resp = await instance1.connection.db.collection("users").find({}).toArray();
      const da = await queryDB(instance1, "users");
      //read data from instance 1

      // let instanceObj = CircularJSON.stringify(instance1);
      // let instanceObj = instance1;
      // let instanceId = instance1.id;

      // let resp = await dbConnectionsModel
      //   .findOneAndUpdate({ id: req.body.id }, { $set: { instanceObj: instanceObj, instanceId: instanceId } }, { new: true })
      //   .lean()
      //   .exec();
      res.send(data);
    } else {
      res.send("No record found");
    }
  } catch (err) {
    console.log(err);
  } finally {
    // instance1.close();
  }
}

async function readFromDB(req, res) {
  try {
    const { body } = req;

    const data = await dbConnectionsModel.findOne({ id: body.id }).lean().exec();

    if (data) {
      //use the instanceObj to connect to the database
      //read the data from the database
      //return the data
      let instanceObj = CircularJSON.parse(data.instanceObj);

      //reconnect to the database
      let instance1 = new Mongoose();

      //read data from the instance
      let resp = await instanceObj.connection.db.collection(body.collectionName).find({}).toArray();

      res.send(resp);
    } else {
      res.send("No record found");
    }
  } catch (err) {
    console.log(err);
  }
}

// setTimeout(async() => {
//   //run after a minute
//   //check if the instanceObj is still connected to the database
//   //if not connected, then connect to the database
//   //if connected, then do nothing
//   console.log("Execution happending at 1 minutes");

//   try{

//     console.log("checking if the instance is still connected to the database");
//     const response = await queryDB(DB_INSTANCE_1, "users");
//     console.log(response[0].shopName);
//     if (DB_INSTANCE_1) {
//       console.log("instance is connected to the database");
//     } else {
//       console.log("instance is not connected to the database");
//     }
//   }catch(err){
//     console.log(err);
//   }
// }, 60000);

// setTimeout(async() => {
//   //run after 10 minutes
//   //check if the instanceObj is still connected to the database
//   //if not connected, then connect to the database
//   //if connected, then do nothing

//   try {
//     console.log("checking if the instance is still connected to the database");
//     console.log("Execution happending at 10 minutes");

//     const response = await queryDB(DB_INSTANCE_1, "users");
//     console.log(response[0].shopName);

//     console.log(response);
//     if (DB_INSTANCE_1) {
//       console.log("instance is connected to the database");
//     } else {
//       console.log("instance is not connected to the database");
//     }

//   } catch (error) {
//     console.log(error);
//   }
// }, 600000);

// setTimeout(async() => {
//   //run after 20 minutes
//   //check if the instanceObj is still connected to the database
//   //if not connected, then connect to the database
//   //if connected, then do nothing
//   try {
//     console.log("Execution happending at 20 minutes");
//     console.log("checking if the instance is still connected to the database");
//     const response = await queryDB(DB_INSTANCE_1, "users");
//     console.log(response[0].shopName);

//     console.log(response);
//     if (DB_INSTANCE_1) {
//       console.log("instance is connected to the database");
//     } else {
//       console.log("instance is not connected to the database");
//     }

//   } catch (error) {
//     console.log(error);
//   }
// }, 1200000);

// //settimeout to execute after 30 mins and one hour
// setTimeout(async() => {
//   //run after 30 minutes
//   try{
//     console.log("Execution happending at 30 minutes");
//     // console.log("checking if the instance is still connected to the database");
//     const response = await queryDB(DB_INSTANCE_1, "users");
//     console.log(response[0].shopName);
//     if (DB_INSTANCE_1) {
//       console.log("instance is connected to the database");
//     } else {
//       console.log("instance is not connected to the database");
//     }
//   }catch(err){
//     console.log(err);
//   }
// }, 1800000);

// //settimeout to execute after one hour
// setTimeout(async() => {
//   try{
//     console.log("Execution happending at 1 hour");
//     const response = await queryDB(DB_INSTANCE_1, "users");
//     console.log(response[0].shopName);
//     if (DB_INSTANCE_1) {
//       console.log("instance is connected to the database");
//     } else {
//       console.log("instance is not connected to the database");
//     }
//   }catch(err){
//     console.log(err);
//   }
// }, 3600000);

module.exports = app;
