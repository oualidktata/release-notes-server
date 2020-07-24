const { ApolloServer, gql } = require("apollo-server");
const {
  getApplications,
  getAllVersions,
  getVersionsByApp,
  createVersion,
} = require("./dataService.js");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// const books = [
//     {
//       title: 'Harry Potter and the Chamber of Secrets',
//       author: 'J.K. Rowling',
//     },
//     {
//       title: 'Jurassic Park',
//       author: 'Michael Crichton',
//     },
//   ];

const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Version {
    id: ID!
    major: String!
    minor: String!
    patch: String!
    description: String!
    application: Application
    details: VersionDetail[]
    #   externalLinks:ExtLink[]
    #   deployment:Deployment
  }

  #   type Deployment{
  #       id:ID!
  #   }
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
    location: Location
  }
  type Location {
    id: ID!
    name: String!
    description: String!
  }
    type VersionDetail{
        id:ID!,
        name:String!
        description:String!
        status:Status!
        links:[ExtLink]
    }

    type TargetSystem{
      id:ID!,
    name:String!,
    description:String,
    isActive:Boolean,
    tenant: Tenant!   
    }


    type Status{
        id:ID!
        code:String!
        name:String!
        description:String!
    }
  #   type ExtLink{
  #       id:ID!
  #       name:String!
  #       description:String!
  #       system:ExternalSystem!
  #   }
  type ExternalSystem {
    id: ID!
    name: String!
  }
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    #books: [Book]
    versions: [Version]
    versionsByApp(appIds:[ID]!):[Version]
    applicationsByTenant(tenantId:ID!): [Application]

  }

  type Mutation{
      addVersion(major:String!,minor:String!,patch:String!,description:String!,appId:ID!):Version!
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    versions: () => getAllVersions(),
    versionsByApp: (parent, args, context, info) =>
      getVersionsByApp(parent, args, context, info),
    applicationsByTenant: (parent, args, context, info) =>
      getApplications(args),
  },
  Mutation: {
    addVersion: (parent, args, context, info) => createVersion(args),
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
