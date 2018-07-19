var require = require('assert');
var calc = require('calc');

describe('count string characters', function(){
    it("count string hello", function(done) {
        assert.equal(calc.count("hello"), 4);
    })
})