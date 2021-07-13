import { openTorrent } from './src/utils/torrent-handler.js';
import { download } from './src/utils/download.js';

const torrent = openTorrent(process.argv[2]));
download(torrent);
