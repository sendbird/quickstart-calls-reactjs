# Sendbird Calls for JavaScript Quickstart

![Platform](https://img.shields.io/badge/platform-JAVASCRIPT-orange.svg)
![Languages](https://img.shields.io/badge/language-JAVASCRIPT-orange.svg)

## Introduction

Sendbird Calls SDK for JavaScript is used to initialize, configure, and build voice and video calling functionality into your JavaScript client app. In this repository, you will find the steps you need to take before implementing the Calls SDK into a project, and a sample app which contains the code for implementing voice and video call.

This quickstart is built with [React](https://reactjs.org/). This repository contains the two types of quickstarts; Direct Call and Group Call.
In Direct Call quickstart, you can perform a 1-on-1 call by dialing to a specific user.
In Group Call quickstart, you can perform a multi-user call by creating and entering a room.

### More about Sendbird Calls for Javascript

Find out more about Sendbird Calls for JavaScript on [Calls for JavaScript doc](https://sendbird.com/docs/calls/v1/javascript/getting-started/about-calls-sdk). If you need any help in resolving any issues or have questions, visit [our community](https://community.sendbird.com).

<br />

## Before getting started

This section shows you the prerequisites you need for testing Sendbird Calls for Javascript sample app.

### Requirements

The minimum requirements for Calls SDK for Javascript sample are: 

- Node
- npm (or yarn)
- Modern browser, supporting WebRTC APIs.

<br />

## Getting started

If you would like to try the sample app specifically fit to your usage, you can do so by following the steps below. 

### Create a Sendbird application

1. Login or Sign-up for an account on [Sendbird Dashboard](https://dashboard.sendbird.com).
2. Create or select an application on the dashboard.
3. Note your Sendbird application ID for future reference.
4. [Contact sales](https://get.sendbird.com/talk-to-sales.html) to get the **Calls** menu enabled on your dashboard. A **self-serve** will be available soon to help you purchase call credits automatically from your dashboard.  

### Create test users

1. On the Sendbird dashboard, navigate to the **Users** menu.
2. Create at least two new users: one as a `caller`, and the other as a `callee`.
3. Note the `user_id` of each user for future reference.

### Install and run the sample app

1. Clone this repository 
```bash
$ git clone git@github.com:sendbird/quickstart-calls-reactjs.git
```
2. Install dependencies
```bash
$ cd quickstart-calls-reactjs/sample-01
$ yarn # or, npm install
```
3. In `.env`, replace the value of `REACT_APP_APP_ID` with `APP_ID` which you can find on your Sendbird application information. If you skip this step, an additional field for the **Application ID** will appear in the login view.
```shell script
REACT_APP_APP_ID='APP_ID'
```
4. Build
```shell script
$ yarn build # or, npm run build
```
5. Start the sample app
```shell script
$ yarn start # or, npm run start
```
6. If two devices are available, repeat these steps to install the sample app on each device.

<br />

## Making your first call

### How to make a call

1. On each device, open a browser and go to the index page of the sample web app. The default URL is `localhost:3000`.
2. On the primary device’s browser, log in to the sample app with the user ID set as the `caller`.
3. On the secondary device’s browser, log in to the sample app with the user ID set as the `caller`.
4. On the primary browser, specify the user ID of the `callee` and initiate a call.
5. If all steps are followed correctly, an incoming call notification will appear on the browser of the `callee`.
6. Reverse the roles. Initiate a call from the other browser.
8. If the two testing devices are near each other, use headphones to make a call to prevent audio feedback.

<br />

## Sound Effects
You can use different sound effects to enhance the user experience for events that take place while using Sendbird Calls. 

To add sound effects, use the `SendBirdCall.addDirectCallSound(type: SoundType, uri: string)` method for the following events: dialing, ringing, reconnecting, and reconnected. Remember to set sound effects before the mentioned events occur. To remove sound effects, use the `SendBirdCall.Options.removeDirectCallSound(type: SoundType)` method.

Use `SendBirdCall.addDirectCallSound(type: SoundType, uri: string)` method to set sound effects for a number of types: dialing, ringing, reconnecting, reconnected. Sound effects must be set before the events occur. To unregister a sound effect, remove it by calling `SendBirdCall.Options.removeDirectCallSound(type: SoundType)`.

```javascript
// Play on a caller’s side when making a call.
SendBirdCall.addDirectCallSound(SendBirdCall.SoundType.DIALING, DIALING_SOUND_URL);
// Play on a callee’s side when receiving a call.
SendBirdCall.addDirectCallSound(SendBirdCall.SoundType.RINGING, RINGING_SOUND_URL);
// Play when a connection is lost, but the SDK immediately attempts to reconnect.
SendBirdCall.addDirectCallSound(SendBirdCall.SoundType.RECONNECTING, RECONNECTING_SOUND_URL);
// Play when the connection is re-established.
SendBirdCall.addDirectCallSound(SendBirdCall.SoundType.RECONNECTED, RECONNECTED_SOUND_URL);
```
For more information about sound effects, see the [SDK for JavaScript README for Sound effects](https://github.com/sendbird/sendbird-calls-javascript#sound-effect)


## Reference

For further detail on Sendbird Calls for JavaScript, refer to [Sendbird Calls SDK for JavaScript README](https://github.com/sendbird/sendbird-calls-javascript/blob/master/README.md).
