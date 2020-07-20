const ALL_VERSIONS = [
  {
    id: "v1",
    major: "1",
    minor: "1",
    patch: "0",
    description: "1st version",
    application: {
      id: "app-1",
      name: "AGATE",
      description: "Nice app 1",
      tenant: {
        id: "tenant1",
        name: "tenant name",
        location: "location 1",
      },
    },
  },
  {
    id: "v2",
    major: "1",
    minor: "2",
    patch: "0",
    description: "2nd App",
    application: {
      id: "app-1",
      name: "AGATE",
      description: "2nd Nice app description",
      tenant: {
        id: "tenant1",
        name: "tenant name",
        location: "location 1",
      },
    },
  },
];

const ALL_APPLICATIONS = [
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

module.exports = {
  ALL_APPLICATIONS,
  ALL_VERSIONS,
};
