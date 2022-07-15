const bcrypt =require('bcrypt');


async function hashPassword(){
    const myPassword = 'one piece-vz899';
    const myHash = '$2b$10$NSvMa88Fd.pZ2DEOw3SBC.bdVLr1L4yjOmJ/nbMByNy61GCNpH8yO'
    const isMath = await bcrypt.compare(myPassword,myHash);
    console.log(isMath);
}

hashPassword();
