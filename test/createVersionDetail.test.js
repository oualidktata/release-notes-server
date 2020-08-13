
const {getFullDetail,getSimpleDetail,createVersionDetail} = require('../dataService');
const { expect } = require('chai');
const { describe, it } = require('mocha');


describe("create VersionDetail",()=>{

    it("should return a detail when valid detail",()=>{

         let detail={
                "versionId":"v1",
                "shortDescription": "Added admin screens for basic data",
                "longDescription": "Added admin screens for basic data.....",
                "statusId":"1",
                "changeTypeId":"1",
                "links":[
                    {
                      link:"http://www.google.com",
                      name:"test-1",
                      targetSystemId:"1",
                    },
                    {
                      link:"http://www.facebook.com",
                      name:"45889",
                      targetSystemId:"2",
                    }],
                "isActive": true
        }
        let result=createVersionDetail(detail);
        console.log(result)
        expect(result).to.be.an('object');
        expect(result.status.id).to.be.equal("1")
        expect(result.changeType.id).to.be.equal("1")
        expect(result.linkIds).to.be.an("array")
        expect(result.links[0].name).to.be.equal("test-1")
    })
})