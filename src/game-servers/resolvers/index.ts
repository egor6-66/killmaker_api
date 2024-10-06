import GameServersMutationsResolver from './mutations.resolver';
import GameServersQueriesResolver from './queries.resolver';
import GameServersSubscriptionsResolver from './subscriptions.resolver';

const Resolvers = [GameServersMutationsResolver, GameServersQueriesResolver, GameServersSubscriptionsResolver];

export default Resolvers;
