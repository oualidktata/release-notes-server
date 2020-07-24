const VERSIONS = [
  {
    id: "v1",
    major: "1",
    minor: "1",
    patch: "0",
    description: "1st version",
    details:["v1-0001","v1-0002","v2-0002"],
    applicationId:"app-1", 
  },
  {
    id: "v2",
    major: "1",
    minor: "2",
    patch: "0",
    description: "2nd version",
    applicationId:"app-2", 
  }
];

const VERSION_DETAILS=[
  {
    id:"v1-0001",
    versionId:"v1",
    shortDescription:"Added admin screens for basic data",
    longDescription:"Added admin screens for basic data.....",
    statusId:"1",
    changeTypeId:"1",
    links:["1","2"]
  },
  {
    id:"v1-0002",
    versionId:"v1",
    shortDescription:"Fixed grid sorting capabilities",
    longDescription:"Added new version Details",
    statusId:"1",
    changeTypeId:"1",
    links:["1","2"]
  },
];

const LINKS=[
  {
    id:"link1",
    versionDetailId:"v1-0001",
    name:"CH-458",
    TargetSystemId:"1",
  },
  {
    id:"link2",
    versionDetailId:"v1-0001",
    name:"45889",
    TargetSystemId:"2",
  },
  {
    id:"link3",
    versionDetailId:"v1-0002",
    name:"SD-520",
    TargetSystemId:"1",
  },
]


const APPLICATIONS = [
  {
    id: "app-1",
    name: "AGATE",
    description: "Best App ever",
    tenant: {
      id: "Dev",
      name: "tenant name",
      location: {
        id: "1212",
        name: "MTL",
        description: "Montreal office",
      },
    },
  },
  {
    id: "app-2",
    name: "ADP",
    description: "Awaswome App",
    tenant: {
      id: "Dev",
      name: "Dev Team",
      location: {
        id: "1212",
        name: "MTL",
        description: "Montreal office",
      },
    },
  },
  {
    id: "app-3",
    name: "Facturation",
    description: "Awaswome App",
    tenant: {
      id: "Dev",
      name: "Dev Team",
      location: {
        id: "1212",
        name: "MTL",
        description: "Montreal office",
      },
    },
  },
];
const TARGET_SYSTEMS=[{
   id:"1",
    name:"TFS",
    description:"AzureDevOps",
    isActive:true,
    tenantId:"1"    
},
{
  id:"2",
   name:"Service Desk",
   description:"Manage Engin Service Desk",
   isActive:true,
   tenantId:"1"    
},
{
  id:"3",
   name:"SharePoint file",
   description:"Sharpoint",
   isActive:true,
   tenantId:"1"    
},
{
  id:"4",
   name:"Git",
   description:"Git hub",
   isActive:true,
   tenantId:"1"    
}
];
const TENANTS=[{
    id: "1",
    name: "Quantum MTL",
    location: "Montreal",
},
{
  id: "2",
  name: "DevTeam",
  location: "Montreal",
},
{
  id: "3",
  name: "Quantum Guelph",
  location: "Guelph",
}
]
const STATUSES=[
  {
    id:"1",
    code:"Roadmapped",
    description:"This change is planned",
    isActive:true
  }, {
    id:"2",
    code:"Planned",
    description:"This change is planned",
    isActive:true
  },
  {
    id:"3",
    code:"In progress",
    description:"This change is planned",
    isActive:true
  },
  {
    id:"4",
    code:"Pending MEP Approval",
    description:"This change is planned",
    isActive:true
  },
  {
    id:"5",
    code:"Completed Approval",
    description:"This change is planned",
    isActive:true
  }
];
const CHANGE_TYPES=[
  {
    id:"1",
    name:"Feature",
    description:"New Feature",
    isActive:true

  },
  {
    id:"2",
    name:"Bug Fix",
    description:"Bug Fix",
    isActive:true
  },
  {
    id:"3",
    name:"Enhancement",
    description:"Enhancement",
    isActive:true
  },
  {
    id:"4",
    name:"Data Change",
    description:"Data Change",
    isActive:true
  },
  {
    id:"5",
    name:"Documentation",
    description:"Documentation",
    isActive:true
  }
];

module.exports = {
  VERSIONS,
  VERSION_DETAILS,
  APPLICATIONS,
  STATUSES,
  CHANGE_TYPES,
  TARGET_SYSTEMS,
  LINKS,
  
};
