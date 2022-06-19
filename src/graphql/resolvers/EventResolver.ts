import { pubsub } from '../..';
import Event from '../../models/Event';
import { Resolvers } from '../generated';

export const EventResolvers: Resolvers = {
    Query: {
        events: async () => { console.log("fetch events"); return await Event.find() },
    },
    Mutation: {
        createEvent: async (_, { data }) => await Event.create(data),
        updateEvent: async (_, { data }) => await Event.findByIdAndUpdate(data?._id, data, { new: true }),
        deleteEvent: async (_, { id }) => await Event.findByIdAndDelete(id),
    },
    Subscription: {
        notificationOnIncomingEvent: {
            subscribe: () => pubsub.asyncIterator(['notification On Incoming Event'])
        }
    }
};
