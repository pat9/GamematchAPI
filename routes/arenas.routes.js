const express = require ('express');
const router = express.Router();

const Arenas = require('../models/arenas');

//Get all the arenas
router.get('/', async(req, res) => {    
    const arenas = await Arenas.find().sort({_id:-1});
    res.json(arenas);    
})

//Get a single arena
router.get('/:id', async (req, res) => {
    const arena = await Arenas.findById(req.params.id);
    res.json(arena);
})

//Post a new arena
router.post('/create', async (req, res) => {
    const {userId, arenaId, password, name, format, rules, status, streamed, date, arenaAct} = req.body;
    const arenas = new Arenas({arenaId, password, name, format, rules, status, streamed, date, userId, arenaAct})
    await arenas.save();
    res.json({status: 'Arena Saved!'});
})


//Update an arena
router.put('/update/:id', async (req,res) => {
    const {arenaId, password, name, format, rules, status, streamed, arenaAct, loc:{type, coordinates}} = req.body;
    const newArena = {arenaId, password, name, format, rules, status, streamed, arenaAct, loc:{type, coordinates}};
    await Arenas.findByIdAndUpdate(req.params.id, newArena);
    res.json({status: 'Arena Updated!'});
})

//Delete an arena
router.delete('/delete/:id', async (req, res) =>{
    await Arenas.findByIdAndRemove(req.params.id);
    res.json({status: 'Arena Deleted!'})
})

module.exports = router;