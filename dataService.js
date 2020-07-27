const { version } = require("graphql");
const { v4: uuidv4 } = require("uuid");
const {
  VERSIONS,
  APPLICATIONS,
  TENANTS,
  TARGET_SYSTEMS,
  LINKS,
  STATUSES,
  CHANGE_TYPES,
  VERSION_DETAILS,
} = require("./rawData");

const getAllVersions = () => {
  let allVersions = VERSIONS.map((v) => {
    let newVersionWithApp = { ...v };
    newVersionWithApp.application = APPLICATIONS.find((a) => a.id == v.appId);
    return newVersionWithApp;
  });
  console.log(
    "\x1b[36m%s\x1b[0m",
    `versionToAdd ${JSON.stringify(allVersions)}`
  );
  return allVersions;
};


const getVersionsByApp = ({ appIds }) => {
  let versionsToFetch = VERSIONS.filter((x) => appIds.includes(x.appId)).map(
    (v) => {
      let newVersionWithApp = { ...v };
      var appToAppend = APPLICATIONS.find(
        (a) => a.id == newVersionWithApp.appId
      );
      newVersionWithApp.application = appToAppend;
      return newVersionWithApp;
    }
  );
  console.log("\x1b[36m%s\x1b[0m", JSON.stringify(versionsToFetch));
  return versionsToFetch;
};


// const getVersionsById = ({ appIds }) => {
//   let versionsToFetch = VERSIONS.filter((x) => appIds.includes(x.appId)).map(
//     (v) => {
//       let newVersionWithApp = { ...v };
//       var appToAppend = APPLICATIONS.find(
//         (a) => a.id == newVersionWithApp.appId
//       );
//       newVersionWithApp.application = appToAppend;
//       return newVersionWithApp;
//     }
//   );
//   console.log("\x1b[36m%s\x1b[0m", JSON.stringify(versionsToFetch));
//   return versionsToFetch;
// };

const getVersionById = ({ id })=>{
  let v = VERSIONS.find(ver => ver.id == id);
  if (!v) return;
  let versionToReturn = { ...v };
  var appToAppend = APPLICATIONS.find((a) => a.id == versionToReturn.appId);
  versionToReturn.application = appToAppend;
  console.log("\x1b[36m%s\x1b[0m", JSON.stringify(versionToReturn));
  return versionToReturn;
};

const createVersion = function ({ major, minor, patch, description, appId }) {
  let versionToAdd = {
    id: uuidv4(),
    major: major,
    minor: minor,
    patch: patch,
    description: description || "",
    appId: appId,
  };
  VERSIONS.push(versionToAdd);
  //return the extended model
  let addedVersion = VERSIONS.find((v) => v.id === versionToAdd.id);
  let app = APPLICATIONS.find((x) => x.id == appId);
  addedVersion.application = app;
  console.log(`VERSIONS After Insertion${JSON.stringify(VERSIONS)}`);

  return addedVersion;
};

const getDetails = function ({ versionId }) {
  let res = VERSION_DETAILS.filter((x) => x.versionId === versionId);
  console.log("\x1b[36m%s\x1b[0m", JSON.stringify(res));
  return res;
};

//Basic data
const getApplications = ({ tenantId }) => {
  var apps = APPLICATIONS.filter((x) => x.tenantId === tenantId).map((x) => {
    var newAppWithTenant = { ...x };
    newAppWithTenant.tenant = TENANTS.find((t) => t.id == x.tenantId);

    return newAppWithTenant;
  });

  return apps;
};
const getTargetSystems = ({ tenantId }) =>
  TARGET_SYSTEMS.filter((x) => x.tenant.id == tenantId);
const getStatuses = ({ tenantId }) =>
  STATUSES.filter((x) => x.tenant.id == tenantId);
const getChangeTypes = ({ tenantId }) =>
  CHANGE_TYPES.filter((x) => x.tenant.id == tenantId);
const getTenants = () => TENANTS;

module.exports = {
  getAllVersions,
  getVersionsByApp,
  getApplications,
  createVersion,
  getTargetSystems,
  getStatuses,
  getTenants,
  getChangeTypes,
  getDetails,
  getVersionById
};
