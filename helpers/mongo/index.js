// export a service
module.exports = service;

//service to connect to a database

service.connectToDB = async (dbInstance, dbName) => {
  try {
    //connect to the database
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
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
};

service.queryDB = async (instanceObj, collectionName, query) => {
  return new Promise((resolve, reject) => {
    const db = instanceObj.connection.db;
    //a query is a string that is passed to the database as

    query = find({ });

    const queryTORun = `db.collection(collectionName).${query}`;

    eval(queryTORun);
  });
};
