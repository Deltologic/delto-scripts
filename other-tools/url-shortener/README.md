# Custom url shortener
## Description
Simple HTTP Server responsible for redirecting users from short readable links to longer ones.

## Languages
### Javascript (Node.js)
#### Dependencies
 - Express.js

#### Build & Run
To install dependencies, type in terminal
```bash
npm i
```

Then, to run server, type
```shell
node url-shortener.js
```

To check if everything is working, type in browser:
```
http://localhost:8080/fb
http://localhost:8080/ig
```

## Further configuration
Links are stored in `LINKS` object, where key is shortcut and value is absolute url.
Server port is stored in `PORT` variable. Change it on your needs

_Contributions are welcome_
