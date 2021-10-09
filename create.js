import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "Books",
    Item: {
      bookId: uuid.v1(), // A unique uuid
      bookAuthor: data.values.bookAuthor,
      bookName: data.values.bookName,
      description: data.values.description, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestam
    },
  };
  console.log(params);
  await dynamoDb.put(params);

  return params.Item;
});
