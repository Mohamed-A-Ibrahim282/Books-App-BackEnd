import mongoose from "mongoose";

export const dbConn = mongoose
  .connect("mongodb://localhost:27017/mongooseAsignment")
  .then(() => {
    console.log("Database connected");
  });
