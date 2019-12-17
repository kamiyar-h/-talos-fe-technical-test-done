# Talos fe test api server

This is a node application meant to provide an API to consume for the Talos fe technical tests

## Install
```
npm install
```
## Run
To start the server just run:
```
npm run serve
```

The logs will show you the url to the root of the app. If not busy the server will start running on localhost:3000
Swagger documentation should be under localhost:3000/api-docs/
    
### Notes
- The server uses no db therefore if it is restarted all saved data will be lost.
- If you are going to modify the project run `npm run serve:dev` instead, it will create a demon to watch changes on 
the files triggering swagger documentation refresh and restarting the server
