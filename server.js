const express = require('express');
const app = express();
const burgers = require('./models/burgers')

// module to connect to database (db-name, db-password)
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

// for POSTING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for HANDLEBARS paths
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', async function(req, res){
    const burger = await burgers.select('*', 'WHERE devoured=FALSE');
    console.log('[/ GET] Burgers not devoured:', burger);
    // return it within handlebars
    res.render('index', { burgerHBS: burger });
})

app.get('/', async function(req, res){
    const burger = await burgers.select('*', 'WHERE devoured=TRUE');
    console.log('[/ GET] Burgers devoured:', burger);
    // return it within handlebars
    res.render('index', { burgerHBS2: burger });
})

app.put('/', async function (req,res){
    console.log('[/ PUT] Burgers:', req.body);
    const result = await burgers.update( 'devoured=TRUE', `id='${req.body.id}'` )
    res.redirect('/');
})

app.post('/', async function(req, res){
  console.log( `[/ POST] Data received:`, req.body )
  const result = await burgers.insert('burger_name, devoured', `'${req.body.burgerEntry}', FALSE`)
  // trigger page reload
  res.redirect('/');
})

app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
)