//External Imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//Internal imports
require('./utils/postgress-sql')
const routes = require('./routes/routes');


const app = express();
const port = process.env.PORT;

//Midlewares
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(cors());



//Routes
app.use('/api', routes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
    res.status(400).json({ message: 'A error has occured' })
})

//Api listen
app.listen(port, async () => {
    console.log(`Server working on: ${port}`);
})