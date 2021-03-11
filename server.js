const express = require('express');
const app = express();
const burgers = require('./models/burgers')

// module to connect to database (db-name, db-password)
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 8080;

// will share any static html files with the browser
app.use(express.static('public'));

// for POSTING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for HANDLEBARS paths
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', async function(req, res){
    // fetch from the database where condition...
    const burger = await burgers.select('*', 'WHERE devoured=FALSE');
    console.log('[/ GET] Burgers not devoured:', burger);
    // fetch from the database where condition...
    const burger2 = await burgers.select('*', 'WHERE devoured=TRUE');
    console.log('[/ GET] Burgers devoured:', burger2);
    // return it within 2 loops in handlebars
    res.render('index', { burgerHBS: burger, burgerHBS2: burger2  });
})

app.post('/burger/:id', async function (req,res){
  console.log('[/ Update] Burgers:', req.params.id);
  // When clicking the DEVOUR button...update database entry...
    await burgers.update( 'devoured=TRUE', `id='${req.params.id}'` )
    res.redirect('/');
})

app.post('/', async function(req, res){
  console.log( `[/ POST] Data received:`, req.body )
  // when submitting a new burger...make a new entry into database...
  const result = await burgers.insert('burger_name, devoured', `'${req.body.burgerEntry}', FALSE`)
  // trigger page reload
  res.redirect('/');
})

app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
)