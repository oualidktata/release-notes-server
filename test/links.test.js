const assert = require('chai').assert;

const getLinks =require('../dataService').getLinks;

describe('Private methods', () => {
    it('getLinks should return 2 records for v1-0001',()=>{
        let result=getLinks('v1-0001');
        //console.log(result)
        assert.equal(result.length,2)
    })
});