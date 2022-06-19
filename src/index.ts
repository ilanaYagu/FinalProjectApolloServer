import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connect } from 'mongoose';
import schema from './graphql/schemasMap';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';
import Event from './models/Event';

connect('mongodb+srv://admin:admin@cluster0.pkz5a.mongodb.net/project?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected'))
  .catch((error: any) => {
    console.log("Unable to connect to the db: " + error.message);
    return process.exit(1);
  });;

const PORT = 5006
export const pubsub = new PubSub();

const app = express()
app.use(cors());

const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  // This is the `httpServer` we created in a previous step.
  server: httpServer,
  // Pass a different path here if your ApolloServer serves at
  // a different path.
  path: '/graphql',
});
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,

})

server.start().then((data) => console.log("s"));

server.applyMiddleware({ app })

httpServer.listen(PORT, () => {
  console.log(
    `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
});


const notificate = () => {
  try {
    setInterval(async () => {
      const currentDate = getDBFormatDate(new Date());
      console.log(currentDate);
      let events = await Event.find({ notificationTime: currentDate })
      console.log(events);
      if (events.length) {
        const a = events.map((event) => ({ _id: event._id, title: event.title }));
        console.log(a)
        pubsub.publish('notification On Incoming Event', { notificationOnIncomingEvent: a });
      }
    }, 60000)
  } catch (err) {
    console.log(err)
  }
}

const getDBFormatDate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`

const pad = (value: Number) =>
  value < 10 ? '0' + value : value

notificate();
