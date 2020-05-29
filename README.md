# Serverless backend for contact emails
The code in this repo allows you to deploy with ease an AWS Serverless infrastructure to handle contact requests in your static website. Before to start make sure you own an email verified in the AWS SES service. [How to?](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses-procedure.html)

## 1. Clone this repo
```
$ git clone git@github.com:kommitters/serverless-contact-form.git
```

## 2. Install the Serverless Framework
```
$ npm i -g serverless
```
## 3. Configure your AWS credentials
```
$ serverless config credentials \
    --provider aws \
    --key xxxxxxxxxxxxxx \
    --secret xxxxxxxxxxxxxx
```

## 4. Update the secrets file
```
{
  "NODE_ENV":"dev",
  "EMAIL":"john.doe@mail.com",
  "DOMAIN":"*"
}
```
⚠️ While testing you can keep the domain as **'*'**, however, make sure to change this to your actual domain in production. The **EMAIL** field should contain an email you verified with AWS SES.

## 5. Deploy the API to AWS Lambda
```
$ serverless deploy
```

## 6. Test the API Gateway Endpoint with CURL
```
$ curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"email":"john.doe@email.com","name":"John Doe","message":"Hey!","phone":"12345"}' \
  https://{id}.execute-api.{region}.amazonaws.com/{stage}/email/send
```

## 7. You are done!
Ready to send contact emails from your static website!  💪.

## License
See LICENSE for details.

## Credits
Made with 💙 from kommit
