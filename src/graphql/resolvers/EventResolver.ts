import { pubsub } from '../..';
import { isToday } from '../../date-utils';
import Event from '../../models/Event';
import { Resolvers } from '../generated';

export const EventResolvers: Resolvers = {
    Query: {
        events: async () => { console.log("fetch events"); return await Event.find() },
        todayEvents: async () => {
            const allEvents = await Event.find();
            return allEvents.filter((event) => isToday(new Date(event.beginningTime)))
        },
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
