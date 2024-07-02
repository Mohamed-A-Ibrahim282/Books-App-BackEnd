import { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: String,
    birthDate: Date,
    books: [
      {
        type: Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const Author = model("Author", schema);
