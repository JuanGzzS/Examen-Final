let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

let idN = uuid.v4();

let moviesCollection = mongoose.Schema({

		film_ID: {
				type : String,
				data : idN
		},
		film_title : String,
		year : Number,
		rating : Number
});

let Movie = mongoose.model( 'movies', moviesCollection);

let MoviesList = {
	getAll : function(){
		return Movie.find()
			.then( movies => {
				return movies;
			})
			.catch (error => {
				throw Error(error);
			});
	},
	create : function( newMovie ){
		return Movie.create( newMovie)
			.then ( movie => {
				return movie;
			})
			.catch (error =>{
				return Error(error);
			});
	}

};

module.exports = {
    
    MoviesList
};
