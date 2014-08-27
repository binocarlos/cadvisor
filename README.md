## cadvisor

a basic [cadvisor](https://github.com/google/cadvisor) HTTP API client

## install

```bash
$ npm install cadvisor
```

## usage

```js
var cadvisor = require('cadvisor')
var backend = cadvisor('127.0.0.1:8080')


// get machine information
backend.machine(function(err, data){

})

// get aggregate container information
backend.container('/', function(err, data){

})

// get a specific docker container information
backend.container('/docker/mycontainer', function(err, data){

})
```

## api

### `var backend = cadvisor(endpoint)`

Create a new cadvisor backend by passing the 'host:port' endpoint string:

```js
var backend = cadvisor('127.0.0.1:8080')
```

### `backend.machine(function(err, info){})`

Load machine wide information

### `backend.container(path, function(err, info){})`

Load a specific containers information.

Containers loaded with docker need to have the '/docker' path prefix.


## licence

MIT