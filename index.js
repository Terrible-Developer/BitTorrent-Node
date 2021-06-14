import fs from 'fs';
import bencode from 'bencode';

const torrent = bencode.decode(fs.readFileSync('endeavouros.iso.torrent'));
//const myMsg = Buffer.from('this is a message', 'utf8');
//socket.send(myMsg, 0, , msg.length, url.port, url.host, () => {});
//socket.on('message', msg => {
//    console.log(`the message was ${msg}`);
//});
