const router = require('express').Router()
const Category = require('../models/category')

// create category
router.post('/', async (req, res) => {
    const newCat = new Category(req.body)
    try {
        const savedCat = await newCat.save()
        res.status(200).json(savedCat)
    } catch (err) {
        res.status(500).json(err)
    }
})

/*
    get all categories
    get one category
    update category
    delete category
*/

// get all categories
router.get('/', async (req, res) => {
    try {
        const cats = await Category.find()
        res.status(200).json(cats)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get one category
router.get('/:id', async (req, res) => {
    try {
        const cat = await Category.findById(req.params.id)
        res.status(200).json(cat)
    } catch (err) {
        res.status(500).json(err)
    }
})

// update category
router.put('/:id', async (req, res) => {
    try {
        const updatedCat = await Category.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCat)
    } catch (err) {
        res.status(500).json(err)
    }
})

// delete category
router.delete('/:id', async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json("Category has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router