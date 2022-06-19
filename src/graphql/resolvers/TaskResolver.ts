import Task from '../../models/Task';
import { Resolvers } from '../generated';

export const TaskResolvers: Resolvers = {
    Query: {
        tasks: async () => await Task.find(),
    },
    Mutation: {
        createTask: async (_, { data }) => await Task.create(data),
        updateTask: async (_, { data }) => await Task.findByIdAndUpdate(data?._id, data, { new: true }),
        deleteTask: async (_, { id }) => await Task.findByIdAndDelete(id),
    },
};
