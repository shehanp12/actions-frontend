import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "Users",
    Item: {
      userId: uuid.v1(),
      firstName: data.values.firstName,
      lastName: data.values.lastName,
      emailAddress: data.values.emailAddress,
      phoneNumber: data.values.phoneNumber,
      state: data.values.state,
      createdAt: Date.now(),
    },
  };
  console.log(params);
  await dynamoDb.put(params);

  return params.Item;
});
