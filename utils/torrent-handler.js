import fs from 'fs';
import bencode from 'bencode';

const openTorrent = torrentPath => {
    return bencode.decode(fs.readFileSync(torrentPath));
};

const getInfoHash = torrent => {

};

const getTorrentSize = torrent => {

};
