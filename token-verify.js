const jwt = require('jsonwebtoken');

const secret = 'one piece';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY1Nzc2MzAzOH0.r1gs5Sz1ex8hp6vxWv1Ho2zsccVkI74k7C2sM0ByZiI';

function verifyToken(token, secret){
    return jwt.verify(token, secret);
}

const res = verifyToken(token, secret);
console.log(res);