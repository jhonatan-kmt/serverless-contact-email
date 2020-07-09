# Serverless backend for contact emails
The code in this repo allows you to deploy with ease an AWS Serverless infrastructure to handle contact requests in your static website. Before to start make sure you own an email verified in the AWS SES service. [How to?](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses-procedure.html)

## Project explanation

The serverless function is responsible to build and send a message to a specific email, as long as it receives the necessary parameters, otherwise return an error.

__Test case:__

You are a client, and you fill out and submit a form inside a static website:

- The static website is going to send a request to this serverless function.
- This function will receive the request and will validate all parameters.
- If the request has the correct parameters, then the function is going to build and send a message to the email specified, in the ```serverless.json``` file, using Amazon SES. Otherwise, the function throws an exception and returns an error message.
- Finally, the function returns a response with its respective HTTP status code.

__Successful case: a request from postman to the serverless function__

![sendEmailNew](https://user-images.githubusercontent.com/53305417/87050354-c53b4200-c1c3-11ea-94ff-4092de34737d.gif)

__Failed case: No message in the request__

![error message](https://user-images.githubusercontent.com/53305417/87050111-768da800-c1c3-11ea-8114-1ec949d771c8.jpg)

## Configuration and deployment

### 1. Clone this repo
```
$ git clone git@github.com:kommitters/serverless-contact-form.git
```

### 2. Install the Serverless Framework
```
$ npm i -g serverless
```
*__Note:__ If you're using Linux, you may need to run the command as sudo.*

### 3. Configure your AWS credentials
```
$ serverless config credentials \
    --provider aws \
    --key xxxxxxxxxxxxxx \
    --secret xxxxxxxxxxxxxx
```

### 4. Update the secrets file
```
{
  "NODE_ENV":"dev",
  "EMAIL":"john.doe@mail.com",
  "DOMAIN":"*"
}
```
⚠️ While testing you can keep the domain as **'*'**, however, make sure to change this to your actual domain in production. The **EMAIL** field should contain an email you verified with AWS SES.

### 5. Deploy the API to AWS Lambda
```
$ serverless deploy
```

### 6. Test the API Gateway Endpoint

__with CURL:__

```
$ curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"john.doe@email.com","name":"John Doe","message":"Hey!","phone":"12345"}' \
  https://{id}.execute-api.{region}.amazonaws.com/{stage}/email/send
```

__With Postman:__

![postman](https://user-images.githubusercontent.com/53305417/87050117-77263e80-c1c3-11ea-80c0-24f749cb1ecc.jpg)

### 7. You are done!
Ready to send contact emails from your static website!  💪.

## Contributing
Bug reports and pull requests are welcome on GitHub https://github.com/kommitters/serverless-contact-email. Everyone is welcome to participate in the project. If you are thinking about contributing to the project, please check our [Contributing Guide](https://github.com/kommitters/serverless-contact-email/blob/master/CONTRIBUTING.md).

## Changelog
See the [CHANGELOG](https://github.com/kommitters/serverless-contact-email/blob/master/CHANGELOG.md) for versions details.

## License
See [LICENSE](https://github.com/kommitters/serverless-contact-email/blob/master/LICENSE) for details.

## Credits
Made with 💙 by kommit
