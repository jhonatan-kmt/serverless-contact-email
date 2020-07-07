const handler = require("./handler");
const AWS = require('aws-sdk');

jest.mock('aws-sdk', () => {
  return {
    SES: jest.fn(() => ({
      sendEmail: jest.fn((params) => {
        return {
          promise() {
            return Promise.resolve({
              status: "200",
              statusDescription: "OK",
            });
          },
        };
    }),
  })),
}});

const request = {
  body: '{ "email":"test@test.co", "name":"Test name", "message":"test message", "phone":123456789}',
}

describe("Test handler responses", () => {
  it("generate email params", () => {
    const emailParams = handler.generateEmailParams('{ "email":"test@test.co", "name":"Test name", "message":"test message", "phone":123456789}');
    expect(emailParams.Source).toEqual('email@email.com');
    expect(emailParams.Destination.ToAddresses[0]).toEqual('email@email.com');
    expect(emailParams.ReplyToAddresses[0]).toEqual('test@test.co');
    expect(emailParams.Message.Subject.Data).toEqual('New contact message from myTestDomain.com!');
  });

  it("get an error to generate email params", () => {
    try {
      handler.generateEmailParams('{ "email":"test@test.co", "name":"Test name", "message":"test message"}');
    } catch (error) {
      expect(error.message).toEqual('Missing parameters! Make sure to add \'email\', \'name\', \'phone\' as parameters.');
    }
  });

  it("generate an error response", () => {
    const error = {message: "You are not authorized"};
    const handlerResponse = handler.generateError(401, error);

    expect(handlerResponse.statusCode).toEqual(401);
    expect(handlerResponse.body).toEqual(JSON.stringify(error.message));
  });

  it("generate a good response", () => {
    const handlerResponse = handler.generateResponse(200, "OK");
    expect(handlerResponse.statusCode).toEqual(200);
    expect(handlerResponse.body).toEqual(JSON.stringify("OK"));
  });

  it("check handler.send with a good responses", async () => {
    const response = await handler.send(request);
    const body = JSON.parse(response.body);
    expect(response.statusCode).toEqual(200);
    expect(body.status).toEqual('200');
    expect(body.statusDescription).toEqual('OK');
  });
});
