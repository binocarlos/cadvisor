var tape = require('tape')
var cadvisor = require('./')
var backend = cadvisor('192.168.8.120:8085')

tape('load machine data', function(t){
	backend.machine(function(err, info){
		if(err){
			t.fail(err, 'load info')
			t.end()
			return
		}
		console.log('-------------------------------------------');
		console.dir(info)
		t.end()
	})
})