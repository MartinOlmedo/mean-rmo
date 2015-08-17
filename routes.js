module.exports = function(app){
	var SerieTV = require('./serietv');
	console.log("entro en routes.js")

	// GET 
	findAllSeriesTV = function(req,res){
		SerieTV.find(function(err, seriestv){
			if(!err) 
				res.send(seriestv);
			else 
				console.log('ERROR'+err);
		});
	};

	// GET 
	findById = function(req,res){
		SerieTV.findById(req.params.id, function(err, serietv){
			if(!err) 
				res.send(serietv);
			else 
				console.log('ERROR'+err);
		});
	};

	// POST
	addSerieTV = function(req,res){
		console.log('POST' + req.body);

		var serietv = new SerieTV({
			titulo: req.body.titulo,
			temporadas: req.body.temporadas, 
			pais: req.body.pais,
			genero: req.body.genero
		});

		serietv.save(function(err){
			if(!err) 
				res.send('SERIE TV GUARDADA');
			else 
				console.log('ERROR'+err);
		});

		res.send(serietv);
	};

	//PUT - Update a register already exists
	updateSerieTV = function(req, res) {
	  	SerieTV.findById(req.params.id, function(err, serietv) {
		    serietv.titulo   = req.body.titulo;
		    serietv.temporadas    = req.body.temporadas;
		    serietv.pais = req.body.pais;
		    serietv.genero  = req.body.genero;
		});

	  	serietv.save(function(err) {
	      if(!err) {
	      console.log('actualizada seriestv ');
	      } else {
	      console.log('ERROR: ' + err);
	      }

	      res.send(serietv);
	    });

	};


	// DELETE - remove a register already exists
	deleteSerieTV = function(req, res) {
	  	SerieTV.findById(req.params.id, function(err, serietv) {
		    serietv.remove(function(err){
		    	if(!err) {
			      console.log('borrada serie tv ');
		      	} else {
			      console.log('ERROR: ' + err);
			    }
		    });
		});

	  	/*
	  	SerieTV.save(function(err) {
	      if(!err) {
	      console.log('actualizada seriestv ');
	      } else {
	      console.log('ERROR: ' + err);
	      }

	      res.send(serietv);
	    });
		*/
	};


	app.get('/seriestv', findAllSeriesTV);
	app.get('/seriestv/:id', findById);
	app.post('/seriestv', addSerieTV);
	app.put('/seriestv/:id', updateSerieTV);
	app.delete('/seriestv/:id', deleteSerieTV);
};