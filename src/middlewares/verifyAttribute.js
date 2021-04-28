function verifyAttribute(req, res, next) {
    const type = req.body.type;
    const state = req.body.state;
    const energy = req.body.energy;
    const typeArray = ["voiture", "moto", "scooter"]
    const stateArray = ["occasion", "neuf"]
    const energyArray = ["essence", "diesel", "electrique", "hybride"]
    if (!typeArray.includes(type) || !stateArray.includes(state) || !energyArray.includes(energy)) {
        return res.status(401).send({
            creates: false,
            message: "Bad Attribut"
        })
    }
    next();
}

module.exports = verifyAttribute;