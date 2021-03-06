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
		t.equal(typeof(info.num_cores), 'number', 'num cores')
		t.equal(typeof(info.memory_capacity), 'number', 'memory_capacity')
		t.end()
	})
})

tape('container data', function(t){
	backend.container('/docker', function(err, info){
		if(err){
			t.fail(err, 'load info')
			t.end()
			return
		}
		t.equal(info.name, '/docker', 'info name')
		t.equal(info.stats.length, 60, '60 stats')
		
		t.end()
	})
})