const expect = require("chai").expect;

const getSimpleLink = require("../dataService").getSimpleLink;
const getLinks = require("../dataService").getLinks;
const upsertLink = require("../dataService").upsertLink;

const getFirstLink=()=>{

}
describe("upsert New link", () => {
  before(() => {
   
  });
  it("should update an existant Link to the detail", () => {
    let allLinkIds = getLinks("v1-0001");
    let allSimpleLinks = allLinkIds.map((link) => getSimpleLink(link.id));
    let firstLink = allSimpleLinks[0];

    let newValue = firstLink.link + "Modified";
    firstLink.link = newValue;
    let linkToAdd={
      input:
        {...firstLink}
    }
    linkToAdd.input.link=linkToAdd.input.link+"Modified";
    updatedLink = upsertLink(linkToAdd);

    //console.log(result)
    expect(updatedLink.link).to.be.equal(linkToAdd.input.link);
  });
  it("should add a new Link to the detail", () => {
    let allLinkIdsBeforeAdd = getLinks("v1-0001");
let newLinkInput1={input:{
    versionDetailId:"v1-0001",
    link:"http://www.newtestsystem.ca/rb222",
    name:"RB-222",
    targetSystemId:"2",
}
  
}
let newLinkInput2={input:{
    versionDetailId:"v1-0001",
    link:"http://www.newtestsystem.ca/rb222",
    name:"RB-222",
    targetSystemId:"2",
}}

    let addedLink1 = upsertLink(newLinkInput1);
    let addedLink2 = upsertLink(newLinkInput2);
    let allLinkIds = getLinks("v1-0001");

    //console.log(result)
    expect(addedLink1.link).to.be.equal(newLinkInput1.input.link);
    expect(addedLink2.link).to.be.equal(newLinkInput2.input.link);
    expect(allLinkIds.length).to.be.equal(allLinkIdsBeforeAdd.length+2)
  });
});
