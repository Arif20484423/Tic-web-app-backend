import mongoose from "mongoose";

export function connectDb() {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.DB_URI+"/tic")
      .then(() => {
        resolve("Db Connected");
      })
      .catch((err) => {
        console.log("ksbd");
        reject(err);
      });
  });
}
