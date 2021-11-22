# Core

Welcome to Core. Social network project maintained by volunteers.

Core Progress: 20%

## How to install Core

## Linux

Run the following commands:

`sudo pacman -S redis`

`sudo pacman -S git`

`sudo pacman -S npm`

`sudo npm i -g yarn`

`git clone https://github.com/chaosberry/core`

`sudo yarn global add ts-node`

`sudo yarn global add typescript`

`cd core`

`cd server && yarn init`

`yarn add argon2 axios connect-redis cors dotenv express express-session@1.17.0 ioredis mongoose morgan redis socket.io yarn add -D @types/argon2 -D @types/axios -D @types/connect-redis -D @types/cors -D @types/dotenv -D @types/express -D @types/express-session -D @types/ioredis -D @types/mongoose -D @types/morgan -D @types/redis -D @types/socket.io`

`cd ../web && yarn init`

`yarn add axios formik morgan next react socket.io-cli bootstrap -D @types/axios -D @types/morgan -D @types/next -D @types/react -D @types/bootstrap`

## Running Core

Running back server: `ts-node index.ts` (run this inside the server/src directory in core)

Running front server: `npm run dev` (make sure you have set the port used by the front server to 443, the default https port)
