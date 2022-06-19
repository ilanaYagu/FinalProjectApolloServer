import 'graphql-import-node';
import * as eventTypeDefs from './schemas/event.graphql';
import * as taskTypeDefs from './schemas/task.graphql';
import * as emptyTypeDefs from './schemas/empty.graphql';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolversMap';
import { GraphQLSchema } from 'graphql';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [emptyTypeDefs, eventTypeDefs, taskTypeDefs],
  resolvers
})
export default schema
