
const {getFullDetail,getSimpleDetail,getDetailsByVersionId} = require('../dataService');
const { expect } = require('chai');
const { describe, it } = require('mocha');

describe("getVersionDetails('v1')", () => {
    it("should return valid details", () => {
        let result = getDetailsByVersionId({versionId:"v1"});
        console.log(result)
        expect(result).to.be.an('array')
        expect(result[0]).to.be.an("object")
    })
    it("should contain links", () => {
        let result = getDetailsByVersionId({versionId:"v1"});
        let linkIds = result[0].linkIds;
        //console.log(linkIds)
        expect(result).to.be.an('array')
        expect(linkIds).to.be.an('array').lengthOf(2).that.includes("1","2")
        //expect(linkIds).to.contain("1","2")
    })
    describe("getDetail should return child objects", () => { 
        it("should return 2 links", () => {
            let simpleDetail=getSimpleDetail("v1-0001")
            let result = getFullDetail(simpleDetail);
            expect(result.links).to.be.an('array')
            expect(result.links.length).to.equal(2)
            expect(result.links[0]).to.be.an('object')
            expect(result.links[0].id).to.equal("1")
            expect(result.links[0].name).to.equal("CH-458")
        })
        it("should return a valid changeType", () => {
            let simpleDetail=getSimpleDetail("v1-0001")
            let result = getFullDetail(simpleDetail);
            expect(result.changeType).to.be.an('object')
            expect(result.changeType.id).to.equal("1")
        })
        it("should return a valid status", () => {
            let simpleDetail=getSimpleDetail("v1-0001")
            let result = getFullDetail(simpleDetail);
            expect(result.status).to.be.an('object')
            expect(result.status.id).to.equal("1")
        })
    })
    
})
