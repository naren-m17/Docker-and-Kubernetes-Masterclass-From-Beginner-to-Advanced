const express = require( 'express' );
const bodyParser = require( 'body-parser' );

const app = express();

app.use( bodyParser.json() );

const users = [];

app.get( '/', ( resq, res ) => {
    res.json( 'Welcome to the simple express app!' );
});

app.post( '/user',(req,  res) => {
        const { userID } = req.body; 

        if( !userID ){
            return res.status( 400 ).json( 'Missing user ID.' );
        }

        if( users.includes( userID ) ){
            return res.status( 400 ).json( 'Duplicate user ID.' );
        }  

        users.push( userID );

        res.status( 201 ).json( {
                message: 'User created',
                userID: { userID }
            }
        );
});

app.get( '/user', (req, res ) => {
    res.status( 200 ).json( users );
} );


module.exports = app;