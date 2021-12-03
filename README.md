

## Development

You'll need to run two terminals (or bring in a process manager like concurrently/pm2-dev if you like):

Start the Remix development asset server

```sh
npm run dev
```

In a new tab start your express app:

```sh
npm run start:dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```
## Notes for Pardo

- [x] server, databases (plural), routes and app client are built in one package
- [x] data writes to database

### TODO: Complete MVP by December 10th

- ledger routes
- document/ services attachment to dynamic namespaces
  - yaml markup to html parser (fun)   
- namespace searching and categories 
- styling



