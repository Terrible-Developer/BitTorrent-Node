import dgram from 'dgram';
import { Buffer } from 'buffer';
import { urlParse } from 'url';
import crypto from 'crypto';

const udpSend = (torrent, message, rawUrl, callback) => {
    const url = urlParse(rawUrl);
    socket.send(message, 0, message.length, url.port, url.host, callback);
};

const responseType = response => {

};

const buildConnectionRequest = () => {
    //1. buffer allocation
    const buf = Buffer.alloc(16);

    //2. connection_id
    buf.writeUInt32BE(0x417, 0);
    buf.writeUInt32BE(0x27101980, 4);

    //3. action type
    buf.writeUInt32BE(0, 8);

    //4. transaction_id
    crypto.randomBytes(4).copy(buf, 12);

    return buf;
};

const parseConnectionResponse = response => {
    return {
        action: response.readUInt32BE(0),
        transactionId: response.readUInt32BE(4),
        connectionId: response.slice(8)
    };
};

const buildAnnounceRequest = connectionId => {

};

const parseAnnounceResponse = response => {

};

const getPeers = (torrent, callback) => {
    const url = urlParse(torrent.announce.toString("utf8"));
    const socket = dgram.createSocket('udp4');

    udpSend(socket, buildConnectionRequest(), url);

    socket.on('message', response => {
        if(responseType(response) === 'connect'){
            const connectionResponse = parseConnectionResponse(response);
            const announceRequest = buildAnnounceRequest(connectionResponse.connectionId);
            udpSend(socket, announceRequest, url);
        }
        else if(responseType(response) === 'announce'){
            const announceResponse = parseAnnounceResponse(response);
            callback(announceResponse.peers);
        }
    });
};

export {
    getPeers
};
