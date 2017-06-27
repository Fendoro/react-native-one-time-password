# React Native One Time Password

Based on course: https://www.udemy.com/react-native-advanced/

### Used Technologies

JS6, react, react-native, android, react-native-elements, expo, axios, firebase, twilio, google cloud functions

### Getting Started

Checkout this repo, install dependencies, start expo xde (https://expo.io/):

```
> git clone https://github.com/Fendoro/react-native-one-time-password.git
> cd react-native-one-time-password
> cd firebase-auth
> npm install
```

In expo xde open project firebase-auth, host this project and share link on your phone.

If you want use your own google cloud functions:
Install firebase-cli, install dependecies, create service_account.json with private key firebase info and twilio_account.js with twilio phone, account sid and token, then deploy functions

```
> cd react-native-one-time-password
> cd google-functions
> cd functions
> npm install
> cd ..
> firebase deploy --project <your_project_id>
```
