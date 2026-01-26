import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

type User = {
    userId: number;
    name: string;
};

const users: User[]=[];

app.use( express.json() );

app.get('/', (req, res) =>{
    res.send( "Welcome express/typescript app");
});

app.post( '/users', (req, res) =>{
    const { userId, name } = req.body as Partial<User>;

    if( !userId  ){
        return res.status( 400 ).json({
            error: "userId is required",
        });
    }

    if( !name ){
        return res.status( 400 ).json({
            error: "name is required",
        });
    }

    const newUser: User = {userId, name };
    users.push( newUser );

    return res.status( 201 ).json({
        message: "New User created",
        user: newUser,
    });
});

app.get( '/users', (req, res )=>{
    return res.json( users );
});

app.listen( PORT, () =>{
    console.log(`Server listening to port:${PORT}`);
});