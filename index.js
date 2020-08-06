const { ApolloServer, gql } = require("apollo-server");
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
  deleteVersion
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
    shortDescription: String!
    longDescription: String!
    status: Status!
    changeType: ChangeType!
    links: [Link]
    version:Version!,
    isActive:Boolean
  }
  type Link {
    id: ID!
    versionDetailId: ID!
    name: String!
    link:String!
    targetSystem: TargetSystem!
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
    versionById (id:ID!): Version
    versionsByApp(appIds: [ID]!): [Version]
    versionDetailsByVersionId(versionId: ID!): [VersionDetail]


    applications(tenantId: ID!): [Application]
    targetSystems(tenantId: ID!): [TargetSystem]
    statuses(tenantId: ID!): [Status]
    changeTypes(tenantId:ID!):[ChangeType]
    links(detailId:ID!):[Link]
    tenants: [Tenant]
  }

  type Mutation {
    addVersion(
      major: String!
      minor: String!
      patch: String!
      description: String!
      appId: ID!
    ): Version!

    # deleteVersion(id:ID!):Boolean!
  }
`;
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

  },
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

module.exports=server;
