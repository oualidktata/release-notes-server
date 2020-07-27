const { ApolloServer, gql } = require("apollo-server");
const {
  getAllVersions,
  getVersionsByApp,
  getApplications,
  createVersion,
  getTargetSystems,
  getStatuses,
  getTenants,
  getChangeTypes,
  getDetails,
  getVersionById,
} = require("./dataService.js");

//const resolvers = require("./resolvers");

const typeDefs = gql`
  type Version {
    id: ID!
    major: String!
    minor: String!
    patch: String!
    description: String!
    application: Application!
    details: [VersionDetail]
  }
  
  type VersionDetail {
    id: ID!
    name: String!
    description: String!
    status: Status!
    ChangeType: ChangeType!
    links: [Link]
    version:Version!
  }

  type Link {
    id: ID!
    versionDetailId: ID!
    name: String!
    TargetSystemId: ID!
  }

  # Basic data types
  type Application {
    id: ID!
    name: String!
    description: String!
    tenant: Tenant!
  }
  type Tenant {
    id: ID!
    name: String!
    description: String!
    location: String!
  }
  # type Location {
  #   id: ID!
  #   name: String!
  #   description: String!
  # }

  type TargetSystem {
    id: ID!
    name: String!
    description: String
    isActive: Boolean
    tenant: Tenant!
  }

  type Status {
    id: ID!
    code: String!
    description: String!
    isActive: Boolean!
  }

  type ChangeType {
    id: ID
    name: String!
    description: String!
    isActive: Boolean!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  type Query {
    versions: [Version]
    versionById(id:ID!):Version
    versionsByApp(appIds: [ID]!): [Version]
    applicationsByTenant(tenantId: ID!): [Application]
    tenants: [Tenant]
    statuses(tenantId: ID!): [Status]
    targetSystems(tenantId: ID!): [TargetSystem]

  }

  type Mutation {
    addVersion(
      major: String!
      minor: String!
      patch: String!
      description: String!
      appId: ID!
    ): Version!
  }
`;
const resolvers = {
  Query: {
    versions: () => getAllVersions(),
    versionsByApp: (root,args,context,info) => getVersionsByApp(args),
    applicationsByTenant: (root,args,context,info) => getApplications(args),
    tenants:()=>getTenants(),
    versionById:(root,args,context,info) => getVersionById(args),
  },
  Mutation: {
    addVersion: (root,args,context,info) => createVersion(args),
  },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
