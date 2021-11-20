# Core

Welcome to Core. Social network project maintained by volunteers.

Core Progress: 20%

## How to install Core

## Linux

### Arch

Run the following commands:
`sudo pacman -S redis`

`sudo pacman -S git`

`sudo pacman -S npm`

`git clone https://github.com/chaosberry/core`

`sudo npm install -g ts-node`

`sudo npm install -g typescript`

`git clone https://github.com/chaosberry/core`

`cd core`

`cd server && npm init`

`npm install argon2 axios connect-redis cors dotenv express express-session@1.17.0 ioredis mongoose morgan redis socket.io`

`npm install --save-dev @types/argon2 --save-dev @types/axios --save-dev @types/connect-redis --save-dev @types/cors --save-dev @types/dotenv --save-dev @types/express --save-dev @types/express-session@1.17.0 --save-dev @types/ioredis --save-dev @types/mongoose --save-dev @types/morgan --save-dev @types/redis --save-dev @types/socket.io`

`cd ../web && npm init`

`npm install axios formik morgan next react socket.io-cli bootstrap --save-dev @types/axios --save-dev @types/morgan --save-dev @types/next --save-dev @types/react --save-dev @types/bootstrap`

## Ubuntu

Run the following commands:

`sudo apt install redis`

`sudo apt install git`

`git clone https://github.com/chaosberry/core`

`cd core`

`sudo apt install npm`

`sudo npm install -g ts-node`

`sudo npm install -g typescript`

`cd server && npm init`

`npm install argon2 axios connect-redis cors dotenv express express-session@1.17.0 ioredis mongoose morgan redis socket.io`

`npm install --save-dev @types/argon2 --save-dev @types/axios --save-dev @types/connect-redis --save-dev @types/cors --save-dev @types/dotenv --save-dev @types/express --save-dev @types/express-session@1.17.0 --save-dev @types/ioredis --save-dev @types/mongoose --save-dev @types/morgan --save-dev @types/redis --save-dev @types/socket.io`

`cd ../web && npm init`

`npm install axios formik morgan next react socket.io-cli bootstrap --save-dev @types/axios --save-dev @types/morgan --save-dev @types/next --save-dev @types/react --save-dev @types/bootstrap`

## Windows

### Install basic dependencies

[Install Node LTS (and npm)](https://nodejs.org/en/)

[Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

`git clone https://github.com/chaosberry/core`

`cd core`

`npm install -g ts-node`

`npm install -g typescript`

`cd server && npm init`

`npm install argon2 axios connect-redis cors dotenv express express-session@1.17.0 ioredis mongoose morgan redis socket.io`

`npm install --save-dev @types/argon2 --save-dev @types/axios --save-dev @types/connect-redis --save-dev @types/cors --save-dev @types/dotenv --save-dev @types/express --save-dev @types/express-session@1.17.0 --save-dev @types/ioredis --save-dev @types/mongoose --save-dev @types/morgan --save-dev @types/redis --save-dev @types/socket.io`

`cd ../web && npm init`

`npm install axios formik morgan next react socket.io-cli`

`npm install --save-dev @types/axios --save-dev @types/morgan --save-dev @types/next --save-dev @types/react`

## Running Core

Running back server: `ts-node index.ts` (run this inside the server/src directory in core)

Running front server: `npm run dev` (make sure you have set the port used by the front server to 443, the default https port)
