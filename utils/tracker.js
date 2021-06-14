import dgram from 'dgram';
import { Buffer } from 'buffer';
import { urlParse } from 'url';

const udpSend = (torrent, message, rawUrl, callback) => {
    const url = urlParse(rawUrl);
    socket.send(message, 0, message.length, url.port, url.host, callback);
};

const responseType = response => {

};

const buildConnectionRequest = () => {

};

const parseConnectionResponse = response => {

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
