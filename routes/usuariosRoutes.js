import express from "express"

const router = express.Router()

// Routing
router.get('/', (req, res) => {
    res.json({msg: "Hola mundo"})
})



router.get('/nosotros', (req, res) => {
    res.send('Informacion de nosotros')
})

export default router