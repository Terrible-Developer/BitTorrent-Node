import crypto from 'crypto';

let id = null;

const genPeerId = () => {
    if(!id){
        id = crypto.randomBytes(20);
        Buffer.from('-VT0001-').copy(id, 0);
    }
    return id;
};

const getPeerGroup = (iterable, groupSize) => {
    let groups = [];
    for (var i = 0; i < iterable.length; i += groupSize){
        groups.push(iterable.slice(i, i + groupSize));
    }
    return groups;
}

export {
    genPeerId,
    getPeerGroup
}
