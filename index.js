const { ApolloServer, gql } = require("apollo-server");


const resolvers = require("./resolvers").resolvers;

const typeDefs = gql`

input LinkInput {
  id: ID
  versionDetailId:ID! 
  name:String!
  link:String!
  targetSystemId: ID!
  isActive: Boolean
}

input VersionDetailInput{
    versionId:ID!
    shortDescription: String!
    longDescription: String!
    statusId: ID!
    changeTypeId: ID!
    isActive:Boolean
    LinksInput: [LinkInput]
}

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
    versionId:ID!
    shortDescription: String!
    longDescription: String!
    status: Status!
    changeType: ChangeType!
    links: [Link]
    isActive:Boolean
  }
  type Link {
    id: ID!
    versionDetailId: ID!
    name: String!
    link:String!
    targetSystem: TargetSystem!
    isActive: Boolean
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
      addVersionDetail(input:VersionDetailInput):VersionDetail!
      upsertLink(input:LinkInput!):Link!
    # deleteVersion(id:ID!):Boolean!
  }
`;

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

module.exports=server;
