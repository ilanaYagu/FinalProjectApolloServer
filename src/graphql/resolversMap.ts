import { merge } from 'lodash';
import { EventResolvers } from './resolvers/EventResolver';
import { TaskResolvers } from './resolvers/TaskResolver';


const resolverMap = merge(EventResolvers, TaskResolvers)
export default resolverMap
