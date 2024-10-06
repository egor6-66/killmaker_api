export enum QUERY {
    VIEWER_SERVERS = 'viewerServers',
    ALL_SERVERS = 'allServers',
    SERVER = 'server',
    GAME_MAPS = 'gameMaps',
}

export enum MUTATION {
    CREATE_SERVER = 'newServer',
    JOIN_SERVER = 'joinServer',
    LEAVE_SERVER = 'leaveServer',
    SEND_SDP = 'sendSDP',
    SEND_ICE_CANDIDATE = 'sendIceCandidate',
}

export enum SUBSCRIPTION {
    NEW_SERVER = 'newServer',
    UPDATE_SERVER = 'updateServer',
    NEW_PEER = 'newPeer',
    REMOVE_PEER = 'removePeer',
    NEW_SDP = 'newSDP',
    NEW_ICE_CANDIDATE = 'newIceCandidate',
}
