import fs from 'fs';
import bencode from 'bencode';
import crypto from 'crypto';
import bignum from 'bignum';

const openTorrent = torrentPath => {
    return bencode.decode(fs.readFileSync(torrentPath));
};

const getInfoHash = torrent => {
    const info = bencode.encode(torrent.info);
    return crypto.createHash('sha1').update(info).digest();
};

const getTorrentSize = torrent => {
    const size = torrent.info.files ? torrent.info.files.map(file => file.length).reduce((a, b) => a + b) : torrent.info.length;

    return bignum.toBuffer(size, { size: 8 });
};

export {
    getInfoHash,
    getTorrentSize,
    openTorrent
};
