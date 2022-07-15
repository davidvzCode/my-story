const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const { checkApiKey } = require('./middleware/auth.handler');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middleware/error.hadler');

const app = express();
const port = process.env.PORT || 3000;

//const whiteList = ['http://localhost:8080', 'http://myapp.com']

/* const options = {
    origin: (origin, callback) => {
        if(whiteList.includes(origin)) {
             callback(null,true);
        }else{
            callback(new Error('no permission denied'));
        }
           
    }
} 
app.use(cors(options));
*/

app.use(express.json());
app.use(cors());

require('./utils/auth')

app.get('/', (req, res) => {
    res.send('Hello my server in express');
});

app.get('/nueva-ruta', 
checkApiKey,
    (req, res) => {
        res.send('Hello user');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});