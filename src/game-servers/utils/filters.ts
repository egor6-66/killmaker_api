import GameServer from '../game-servers.model';

import { SDP } from './inputs';

class Filters {
    insideServer(server: GameServer, ctx: any) {
        return !!server.users.find((i) => i.id === ctx?.req.extra?.user.id);
    }

    sdpAndIce(data: SDP, ctx: any) {
        return data.peerId === ctx?.req.extra?.user.id;
    }
}

export default new Filters();
