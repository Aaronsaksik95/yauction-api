const app = require('./services/express.service');
const db = require('./services/mongoose.service');
// const offer = require('../src/controllers/offers.controller');

app.start();
db.connectDb();

// setInterval(offer.updateValidated, 10000);


// heroku login
// heroku logs --tail --app api-node-aaron-saksik

/*
**OFFRES**
- Annuler une offres rendre l'avant dernière en attente

**VENTES**

**ADMIN**
- Voiture, moto, scooter. supprimer modifier
- Users. modifier supprimer
- Offres: Validées, refusées, en cours.

**PRODUITS**
- CSS Page détail.
- Page Home.
- Image cloudinary.
- Plusieurs images.

- heroku
- stripe

*/