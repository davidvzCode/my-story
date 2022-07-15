const bcrypt =require('bcrypt');


async function hashPassword(){
    const myPassword = 'one piece-vz';
    const hash = await bcrypt.hash(myPassword, 10);
    console.log(hash);
}

hashPassword();
