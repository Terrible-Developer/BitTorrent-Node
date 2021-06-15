import fs from 'fs';
import bencode from 'bencode';
import { getPeers } from './utils/tracker.js';

const torrent = bencode.decode(fs.readFileSync('endeavouros.iso.torrent'));
getPeers(torrent, peers => {
    console.log(`Peer list: ${peers}`);
});
