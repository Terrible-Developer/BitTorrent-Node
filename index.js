import { openTorrent } from './utils/torrent-handler.js';
import { getPeers } from './utils/tracker.js';

const torrent = openTorrent('endeavouros.iso.torrent'));
getPeers(torrent, peers => {
    console.log(`Peer list: ${peers}`);
});
