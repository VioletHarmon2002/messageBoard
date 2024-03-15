### Simple chat implementation using React and Express.

#### Before you start, you need to install all dependencies using the `npm install` command in the root and client folders.

To start the backend (Express), you need to run the following command ***in the root folder***:
```bash
node index.js
```



The current implementation can be improved by using WebSockets, TypeScript and SASS, but for now it supports:
- Channel selection.
- Reading messages.
- User names.
- Synchronization of messages between clients.
- In-memory caching of recent messages.
- Displaying user messages before sending them to the API server.