import crypto from 'crypto';

let id = null;

const genPeerId = () => {
    if(!id){
        id = crypto.randomBytes(20);
        Buffer.from('-VT0001-').copy(id, 0);
    }
    return id;
};

export {
    genPeerId
}
