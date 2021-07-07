import { Buffer } from 'buffer';
import { getInfoHash } from './torrent-handler.js';
import { genPeerId } from './generic-utils.js';

const buildHandshake = torrent => {
    const buffer =  Buffer.alloc(68);
    //pstrlen
    buffer.writeUInt8(19, 0);
    //pstr
    buffer.write('Bittorrent protocol', 1);
    //reserved
    buffer.writeUInt32BE(0, 20);
    buffer.writeUInt32BE(0, 24);
    //info hash
    getInfoHash(torrent).copy(buffer, 28);
    //peer_Id
    buffer.write(genPeerId());

    return buffer;
};

const buildKeepAlive = () => Buffer.alloc(4);

const buildChoke = () => {
    const buffer = Buffer.alloc(5);
    //length
    buffer.writeUInt32BE(1, 0);
    //id
    buffer.writeUInt8(0, 4);

    return buffer;
};

const buildUnchoke = () => {
    const buffer = Buffer.alloc(5);
    //length
    buffer.writeUInt32BE(1, 0);
    //id
    buffer.writeUInt8(1, 4);

    return buffer;
};

const buildInterested = () => {
    const buffer = Buffer.alloc(5);
    //length
    buffer.writeUInt32BE(1, 0);
    //id
    buffer.writeUInt8(2, 4);

    return buffer;
};

const buildUninterested = () => {
    const buffer = Buffer.alloc(5);
    //length
    buffer.writeUInt32BE(1, 0);
    //id
    buffer.writeUInt8(3, 4); //the 3 is the uninterested id

    return buffer;
};

const buildHave = payload => {
    const buffer = Buffer.alloc(9);
    //length
    buffer.writeUInt32BE(5, 0);
    //id
    buffer.writeUInt8(4, 4); //4 is the have id
    //piece index
    buffer.writeUInt32BE(payload, 5);

    return buffer;
};

const buildBitfield = (bitfield, payload) => {
    const buffer.alloc(14);
    //length
    buffer.writeUInt32BE(payload.length + 1, 0);
    //id
    buffer.writeUInt8(5, 4);
    //bitfield
    bitfield.copy(buffer, 5);

    return buffer;
};

const buildRequest = payload => {
    const buffer = Buffer.alloc(17);
    //length
    buffer.writeUInt23BE(13, 0);
    //id
    buffer.writeUInt8(6, 4);
    //piece index
    buffer.writeUInt32BE(payload.index, 5);
    //begin
    buffer.writeUInt32BE(payload.begin, 9);
    //length
    buffer.writeUInt32BE(payload.length, 13);

    return buffer;
};

const buildPiece = payload => {
    const buffer = Buffer.alloc(payload.block.length + 13);
    //length
    buffer.writeUInt32BE(payload.block.length + 9, 0);
    //id
    buffer.writeUInt8(7, 4);
    //piece index
    buffer.writeUInt32BE(payload.index, 5);
    //begin
    buffer.writeUInt32BE(payload.begin, 9);
    //block
    payload.block.copy(buffer, 13);

    return buffer;
};

const buildCancel = payload => {
    const buffer = Buffer.alloc(17);
    //length
    buffer.writeUInt32BE(13, 0);
    //id
    buffer.writeUInt8(8, 4);
    //piece index
    buffer.writeUInt32BE(payload.index, 5);
    //begin
    buffer.writeUInt32BE(payload.begin, 9);
    //length
    buffer.writeUInt32BE(payload.length, 13);

    return buffer;
};

const buildPort = payload => {
    const buffer = Buffer.alloc(7);
    //length
    buffer.writeUInt32BE(3, 0);
    //id
    buffer.writeUInt8(9, 4);
    //listen-port
    buffer.writeUInt16BE(payload, 5);

    return buffer;
};
