# evie-mobile
React Native project for Evie's mobile app

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Running Locally](#running-locally)
4. [Deploying](#deploying)

## Introduction
Evie is an application that connects EV owners and EV charger owners

## Installation

#### 1. Clone the repository
```
git clone https://github.com/berreys/evie-mobile.git
```

#### 2. Install node dependencies
```
npm install
```
If prompted, install `@expo/ngrok` globally

## Running Locally

#### 1. Download `Expo Go` App from Play Store or App Store

#### 2. Create a .env file

In the root directory of the project, create a file named ```.env```. The contents should be as follows:

```
API_URL=http://127.0.0.1:3000
```

Replace ```127.0.0.1``` with the IP address of the machine running the backend. Find your IP address by running ```ipconfig``` on Windows or ```ipconfig getifaddr en0
``` on Mac/Linux.

#### 3. Run the start script
```
npm run start
```

#### 4. Scan the QR code that appears in the terminal

## Deploying

There is no deployed environment yet for this project.
