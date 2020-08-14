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
    updatedLink = upsertLink(firstLink);

    //console.log(result)
    expect(updatedLink.link).to.be.equal(newValue);
  });
  it("should add a new Link to the detail", () => {
    
let newLink1={
    versionDetailId:"v1-0001",
    link:"http://www.newtestsystem.ca/rb222",
    name:"RB-222",
    targetSystemId:"2",
}
let newLink2={
    versionDetailId:"v1-0001",
    link:"http://www.newtestsystem.ca/rb222",
    name:"RB-222",
    targetSystemId:"2",
}

    let addedLink1 = upsertLink(newLink1);
    let addedLink2 = upsertLink(newLink2);
    let allLinkIds = getLinks("v1-0001");

    //console.log(result)
    expect(addedLink1).to.be.equal(newLink1);
    expect(addedLink2).to.be.equal(newLink2);
    expect(allLinkIds.length).to.be.equal(4)
  });
});
