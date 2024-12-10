import express from 'express';
import product from '../models/product.js';

const router = express.Router();

router.get('/Skateboards', (req, res) => {
    product.find({category: "skateboards"})
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.get('/Clothing', (req, res) => {
    product.find({category: "clothing"})
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.get('/Shoes', (req, res) => {
    product.find({category: "shoes"})
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.get('/Product', (req, res) => {
    product.find({product: req.query.product})
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            console.log(err);
        })
})

export default router;