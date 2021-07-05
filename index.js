import { openTorrent } from './src/utils/torrent-handler.js';
import { getPeers } from './src/utils/tracker.js';

const torrent = openTorrent('endeavouros.iso.torrent'));
getPeers(torrent, peers => {
    console.log(`Peer list: ${peers}`);
});
