var EventEmitter = require('events').EventEmitter
var util = require('util')
var hyperquest = require('hyperquest')
var concat = require('concat-stream')

function Cadvisor(endpoint){
	EventEmitter.call(this)
	this._endpoint = endpoint

}

util.inherits(Cadvisor, EventEmitter)

Cadvisor.prototype.request = function(path, done){
	var path = this.path(path)
	var req = hyperquest('http://' + this._endpoint + path)
	req.on('error', done)
	req.on('response', function(res){
		res.pipe(concat(function(body){
			body = body.toString()
			if(res.statusCode==200){
				if(body.charAt(0)=='{'){
					done(null, JSON.parse(body))	
				}
				else{
					done(body)
				}
			}
			else{
				done(res.statusCode + ': ' + body)
			}
		}))
	})
}

Cadvisor.prototype.path = function(path){
	return '/api/v1.1' + path
}

Cadvisor.prototype.machine = function(done){
	this.request('/machine', done)
}

Cadvisor.prototype.container = function(path, done){
	if(arguments.length<=1){
		done = path
		path = '/'
	}
	if(path.charAt(0)!='/'){
		path = '/' + path
	}
	this.request('/containers' + path, done)
}

module.exports = function(endpoint){
	return new Cadvisor(endpoint)
}