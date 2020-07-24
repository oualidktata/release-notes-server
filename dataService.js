const { version } = require("graphql");
const { v4: uuidv4 } = require("uuid");
const { VERSIONS, APPLICATIONS } = require("./rawData");

const getAllVersions = function () {
  return VERSIONS;
};
const getVersionsByApp = function (parent, args, context, info) {
  console.log("\x1b[36m%s\x1b[0m", JSON.stringify(args) + "\n");
  console.log("\x1b[32m", JSON.stringify(VERSIONS) + "\n");
  let res = VERSIONS.filter((x) => args.appIds.includes(x.application.id));
  console.log("\x1b[36m%s\x1b[0m", JSON.stringify(res));
  return res;
};
const createVersion = function ({ major, minor, patch, description, appId }) {
  let app = APPLICATIONS.filter((x) => x.id === appId)[0];
  console.log(`${JSON.stringify(app)}`);
  let versionToAdd = {
    id: uuidv4(),
    major: major,
    minor: minor,
    patch: patch,
    description: description || "",
    application: app
  };
  
  //versionToAdd.application = app;
  console.log("\x1b[36m%s\x1b[0m",`versionToAdd ${JSON.stringify(versionToAdd)}`);
  console.log(`VERSIONS After Insertion${JSON.stringify(versionToAdd)}`);
  VERSIONS.push(versionToAdd);
  return versionToAdd;
};

const getApplications = function ({ tenantId }) {
  //console.log("\x1b[36m%s\x1b[0m", JSON.stringify(tenantId) + "\n");
  //console.log("\x1b[32m", JSON.stringify(APPLICATIONS) + "\n");
  let res = APPLICATIONS.filter((x) => x.tenant.id == tenantId);
  console.log("\x1b[36m%s\x1b[0m", JSON.stringify(res));
  return res;
};
const getApplications = function ({ tenantId }) {
  //console.log("\x1b[36m%s\x1b[0m", JSON.stringify(tenantId) + "\n");
  //console.log("\x1b[32m", JSON.stringify(APPLICATIONS) + "\n");
  let res = APPLICATIONS.filter((x) => x.tenant.id == tenantId);
  console.log("\x1b[36m%s\x1b[0m", JSON.stringify(res));
  return res;
};

module.exports = {
  getAllVersions,
  getVersionsByApp,
  getApplications,
  createVersion,
  getTargetSystems,
  getStatuses,
  getTenants,
  getChangeTypes,
  getApplications,
};
