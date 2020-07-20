const { version } = require("graphql");
const { v4: uuidv4 } = require("uuid");
const{ALL_VERSIONS,ALL_APPLICATIONS}=require("./rawData");

const getAllVersions = function () {
  return ALL_VERSIONS;
};
const getVersionsByApp = function (parent,args,context,info) {
    console.log('\x1b[36m%s\x1b[0m', JSON.stringify(args)+'\n');
    console.log('\x1b[32m',JSON.stringify(ALL_VERSIONS)+'\n');
    let res=ALL_VERSIONS.filter((x) => (args.appIds.includes(x.application.id)));
    console.log('\x1b[36m%s\x1b[0m', JSON.stringify(res));
  return res;
};
const createVersion = function ({ major, minor, patch, description ,appId}) {
  let versionToAdd = {
    id: uuidv4(),
    major: major,
    minor: minor,
    patch: patch,
    description: description || "",
    application: {
      id: appId
    },
  };
  console.log(`${JSON.stringify(versionToAdd)}`);
  ALL_VERSIONS.push(versionToAdd);
  return versionToAdd;
};

const  getApplications=function({tenantId}) {
    console.log('\x1b[36m%s\x1b[0m', JSON.stringify(tenantId)+'\n');
    console.log('\x1b[32m',JSON.stringify(ALL_APPLICATIONS)+'\n');
    let res=ALL_APPLICATIONS.filter((x) => (x.tenant.id == tenantId));
    console.log('\x1b[36m%s\x1b[0m', JSON.stringify(res));
   return res;
} 


module.exports = {
  getAllVersions,
  getVersionsByApp,
  getApplications,
  createVersion,
};
