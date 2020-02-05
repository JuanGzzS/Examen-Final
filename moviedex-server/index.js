let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let morgan = require('morgan');
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );
let uuid = require( 'uuid' );

//SE AGREGA EL MODELO
let { MoviesList } = require('./model');


let app = express();


app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
	if (req.method === "OPTIONS") {
		return res.send(204);
	}
	next();
});

app.use( express.static('public'));
app.use( morgan('dev'));


// GET
app.get('/api/moviedex', ( req, res) => {

	MoviesList.getAll()
		.then( moviesList => {

			return res.status( 200 ).json( moviesList );
		})
		.catch( error => {
			res.statusMessage = "Error al conectar con la Base de Datos";
			return res.status( 500 ).send(error);
		})

});


//POST
app.post('/api/moviedex', jsonParser, (req , res) => {

	let filmNombre = req.body.film_title;
	let filmYear = req.body.year;
	let filmRating = req.body.rating;

	if ( filmNombre == '' || filmYear == '' || filmRating == ''){

		res.statusMessage = "Falto agregar un parametro";
		return res.status( 406 ).send();
	}

	let idMovie = uuid.v4();

	let nuevaMovie = {

		film_ID : idMovie,
		film_title : filmNombre,
		year : filmYear,
		rating : filmRating
	}


	MoviesList.create( nuevaMovie )
		.then( movie => {
			return res.status(201).json(movie);
		})
		.catch ( error => {
			res.statusMessage = "Error al conectar con la Base de Datos";
			return res.status(500).send(error);
		});
});




let server;

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl,  { useNewUrlParser: true, useUnifiedTopology: true  }, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}
