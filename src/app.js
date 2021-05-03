const app = require('./services/express.service');
const db = require('./services/mongoose.service');
const offer = require('./controllers/offers.controller');

app.start();
db.connectDb();
setInterval(offer.updateValidated, 10000);


// heroku login
// heroku logs --tail --app yauction-api

/*
Ecrire le rendu pdf

**FILTER**
- Filtre yearMin yearMax
- Pas reencherir sur son produit

**PRODUITS**
- CSS DETAILS
- Page Home.
- Image cloudinary.


*/