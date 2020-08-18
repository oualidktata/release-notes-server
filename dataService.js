const { v4: uuidv4 } = require("uuid");
const _ =require('lodash')
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
    newVersionWithApp.application = getApplication(v.appId);
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
  return versionsToFetch;
};

const getVersionById = ({ id }) => {
  let v = VERSIONS.find((ver) => ver.id === id);
  if (!v) return;
  let versionToReturn = { ...v };
  var appToAppend = APPLICATIONS.find((a) => a.id == versionToReturn.appId);
  versionToReturn.application = appToAppend;
  return versionToReturn;
};

const createVersion = function ({ major, minor, patch, description, appId }) {
  let versionToAdd = {
    id: uuidv4(),
    major: major|| "",
    minor: minor|| "",
    patch: patch|| "",
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
const createVersionDetail = ({input}) => {
  let {versionId,
    shortDescription,
    longDescription,
    statusId,
    linksInput,
    changeTypeId,
    isActive = true}={...input}
  let detailId = uuidv4();
  //AddLinks first 2nd phase
  let addedLinkIds = [];
  if (linksInput) {
    addedLinkIds = linksInput.map(l => {
      let linkToAdd={input:{
        versionDetailId:detailId,
        name:l.name,
        link:l.link,
        targetSystemId:l.targetSystemId

      }}
      let addedLink = upsertLink(linkToAdd);
      return addedLink.id;
    });
  }

  let detailToAdd = {
    id: detailId,
    versionId: versionId,
    shortDescription: shortDescription,
    longDescription: longDescription,
    statusId: statusId,
    changeTypeId: changeTypeId,
    linkIds: addedLinkIds,
    isActive: isActive,
  };

  console.log(`DetailToAdd${JSON.stringify(detailToAdd)}`);
  VERSION_DETAILS.push(detailToAdd);
  //return the extended model
  var simpleDetail = getSimpleDetail(detailToAdd.id);
  let fullDetail = getFullDetail(simpleDetail);
  return fullDetail;
};

const upsertLink = ({input}) => {
  let linkToAdd={}={...input}
  if (!linkToAdd.id) {
    linkToAdd.id = uuidv4();
  }
  let index=LINKS.findIndex(link => link.id === linkToAdd.id)
  LINKS.splice(index,index,linkToAdd);
  return getFullLink(linkToAdd.id);
};
 
const deleteVersion = ({ id }) => {
  let versionToDelete = VERSIONS.find((v) => v.id === versionToAdd.id);
  if (versionToDelete) {
    versionToDelete.isActive = false;
    VERSIONS.pop((v) => v.Id === id);
    VERSIONS.push(versionToDelete);
    return true;
  }
  return false;
};

const getDetailsByVersionId = ({ versionId }) => {
  let details = VERSION_DETAILS.filter((x) => x.versionId === versionId);
  let detailsToReturn = details.map((detail) => getFullDetail(detail));
  return detailsToReturn;
};
const getSimpleDetail = (versionDetailId) => {
  let simpleDetail = VERSION_DETAILS.find((x) => x.id === versionDetailId);
  return simpleDetail;
};

//Basic data
const getApplications = ({ tenantId }) => {
  var apps = APPLICATIONS.filter((x) => x.tenantId === tenantId).map((x) => {
    var newAppWithTenant = { ...x };
    newAppWithTenant.tenant = TENANTS.find((t) => t.id === x.tenantId);
    return newAppWithTenant;
  });

  return apps;
};
const getLinks = (detailId) => {
  let newLinks = LINKS.filter((x) => x.versionDetailId === detailId).map(
    (l) => {
      var newLink = { ...l };
      newLink.targetSystem = getTargetSystem(l.targetSystemId);
      return newLink;
    }
  );

  return newLinks;
};
const getSimpleLink = (linkId) => LINKS.find(link => link.id === linkId);

const getFullDetail = (detail) => {
  detail.changeType = getChangeType(detail.changeTypeId);
  detail.status = getStatus(detail.statusId)
  if (detail.linkIds) {
    detail.links = detail.linkIds.map(linkId =>getFullLink(linkId));
  }
  return detail;
};

const getFullLink = (id) => {
  let simpleLink =getSimpleLink(id)
  if (!simpleLink)return null
  simpleLink.targetSystem = getTargetSystem(simpleLink.targetSystemId);
  return simpleLink;
};

const getTargetSystem = (id) => TARGET_SYSTEMS.find((x) => x.id === id);
const getStatus = (id) => STATUSES.find((x) => x.id === id);
const getApplication = (id) => APPLICATIONS.find((x) => x.id === id);
const getChangeType = (id) => CHANGE_TYPES.find((x) => x.id === id);

const getTargetSystems = ({ tenantId }) =>
  TARGET_SYSTEMS.filter((x) => x.tenantId == tenantId);
const getStatuses = ({ tenantId }) =>
  STATUSES.filter((x) => x.tenantId == tenantId);
const getChangeTypes = ({ tenantId }) =>
  CHANGE_TYPES.filter((x) => x.tenantId == tenantId);
const getTenants = () => TENANTS;

module.exports = {
  getAllVersions,
  getVersionsByApp,
  getApplications,
  getTargetSystems,
  getStatuses,
  getTenants,
  getChangeTypes,
  getDetailsByVersionId,
  getVersionById,

  getSimpleDetail,
  getFullDetail,
  getLinks,
  getSimpleLink,

  getChangeType,
  getApplication,
  getStatus,
  getTargetSystem,

  createVersion,
  createVersionDetail,
  deleteVersion,
  upsertLink,
};
