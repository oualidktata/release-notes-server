// Resolvers define the technique for fetching the types defined in the
// schema. 
const {
  getAllVersions,
  getVersionsByApp,
  getApplications,
  getTargetSystems,
  getStatuses,
  getTenants,
  getChangeTypes,
  getDetailsByVersionId,
  getVersionById,
  getLinks,
  createVersion,
  createVersionDetail,
  deleteVersion
} = require("./dataService.js");
const resolvers = {
  Query: {
    versions: () => getAllVersions(),
    versionsByApp: (root,args,context,info) => getVersionsByApp(args),
    versionById:(root,args,context,info) => getVersionById(args),
    versionDetailsByVersionId:(root,args,context,info)=>getDetailsByVersionId(args),
    applications: (root,args,context,info) => getApplications(args),
    changeTypes: (root,args,context,info) => getChangeTypes(args),
    statuses: (root,args,context,info) => getStatuses(args),
    targetSystems: (root,args,context,info) => getTargetSystems(args),
    tenants:()=>getTenants(),
    links:(root,args,context,info) => getLinks(args),
  },
  Mutation: {
    addVersion: (root,args,context,info) => createVersion(args),
    // deleteVersion: (root,args,context,info) => deleteVersion(args),
    addVersionDetail:(root,args,context,info) => createVersionDetail(args),

  },
};

  module.exports={resolvers};