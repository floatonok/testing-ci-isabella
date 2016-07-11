const express = require('express')
const router = express.Router()
var candiesArr = [
  {'id': 1,
  'name': 'Chewing Gum',
  'color': 'Red'},

  {'id': 2,
  'name': 'Pez',
  'color': 'Green'},

  {'id': 3,
  'name': 'Marshmallow',
  'color': 'Pink'},

  {'id': 4,
  'name': 'Candy Stick',
  'color': 'Blue'}
]

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// ROOT
router.get('/', (req, res) => {
  res.status(200).json({
    api_version: 'v1.0.0',
    candies: '/candies'
  })
})

// INDEX
router.get('/candies', (req, res) => {
  res.status(200).json(candiesArr)
})

// show
router.get('/candies/:id', (req, res) => {
  res.status(200).json(candiesArr[req.params.id - 1])
})

// create
router.post('/candies', (req, res) => {
  if (req.body.color === 'wrong') {
    res.status(422).json({message: 'wrong color'})
  }

  res.status(201).json({
    id: req.body.id,
    name: req.body.name,
    color: req.body.color
  })

  var newCandy = {
    id: req.body.id,
    name: req.body.name,
    color: req.body.color
  }

  candiesArr.push(newCandy)
})

// update
router.put('/candies/:id', (req, res) => {
  candiesArr[req.params.id - 1].id = req.body.id
  candiesArr[req.params.id - 1].name = req.body.name
  candiesArr[req.params.id - 1].color = req.body.color
  res.status(200).json(candiesArr[req.params.id - 1])
})

// destroy
router.delete('/candies/:id', (req, res) => {
  res.status(200).json(`Candy ${req.params.id} deleted`)
  candiesArr.splice(req.params.id - 1, 1)
})

module.exports = router
