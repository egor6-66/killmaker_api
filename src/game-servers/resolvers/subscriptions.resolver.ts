import { forwardRef, Inject } from '@nestjs/common';
import { Int, Resolver, Subscription } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';

import { PUB_SUB } from '../../pubSub/pubSub.module';
import GameServer from '../game-servers.model';
import { Enums, Filters, Outputs } from '../utils';

@Resolver()
class GameServersSubscriptionsResolver {
    constructor(@Inject(forwardRef(() => PUB_SUB)) private readonly pubSub: RedisPubSub) {}

    @Subscription(() => GameServer, {
        nullable: true,
        name: Enums.SUBSCRIPTION.NEW_SERVER,
        filter: (payload, variables, context) => context?.req.extra?.user.id !== payload.newServer.owner.id,
    })
    newServer() {
        return this.pubSub.asyncIterator(Enums.SUBSCRIPTION.NEW_SERVER);
    }

    @Subscription(() => GameServer, {
        name: Enums.SUBSCRIPTION.UPDATE_SERVER,
        filter: (payload, variables, context) => Filters.insideServer(payload.server, context),
        resolve: (payload) => payload.server,
    })
    updateServer() {
        return this.pubSub.asyncIterator(Enums.SUBSCRIPTION.UPDATE_SERVER);
    }

    @Subscription(() => Outputs.NewPeer, {
        name: Enums.SUBSCRIPTION.NEW_PEER,
        filter: (payload, variables, context) => Filters.insideServer(payload.server, context),
        resolve: (payload, variables, context) => {
            const createOffer = payload.peerId === context?.req.extra?.user.id;
            if (payload.peerId === context?.req.extra?.user.id)
                return { peers: payload.server.users.filter((i) => i.id !== payload.peerId).map((i) => i.id), createOffer };

            return { peers: [payload.peerId], createOffer };
        },
    })
    newPeer() {
        return this.pubSub.asyncIterator(Enums.SUBSCRIPTION.NEW_PEER);
    }

    @Subscription(() => Int, {
        name: Enums.SUBSCRIPTION.REMOVE_PEER,
        filter: (payload, variables, context) => Filters.insideServer(payload.server, context),
        resolve: (payload) => payload.peerId,
    })
    removePeer() {
        return this.pubSub.asyncIterator(Enums.SUBSCRIPTION.REMOVE_PEER);
    }

    @Subscription(() => Outputs.NewSDP, {
        name: Enums.SUBSCRIPTION.NEW_SDP,
        filter: (payload, variables, context) => Filters.sdpAndIce(payload.data, context),
        resolve: (payload) => ({ peerId: payload.data.initiator, sdp: payload.data.sdp }),
    })
    newSDP() {
        return this.pubSub.asyncIterator(Enums.SUBSCRIPTION.NEW_SDP);
    }

    @Subscription(() => Outputs.NewIceCandidate, {
        name: Enums.SUBSCRIPTION.NEW_ICE_CANDIDATE,
        filter: (payload, variables, context) => Filters.sdpAndIce(payload.data, context),
        resolve: (payload) => ({ peerId: payload.data.initiator, iceCandidate: payload.data.iceCandidate }),
    })
    newIceCandidate() {
        return this.pubSub.asyncIterator(Enums.SUBSCRIPTION.NEW_ICE_CANDIDATE);
    }
}

export default GameServersSubscriptionsResolver;
