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

**OFFRES**
- Ajouter du credit au user avec stripe avant de faire une offre

**PRODUITS**
- Page détail.
- Page Home.
- Image cloudinary.


*/