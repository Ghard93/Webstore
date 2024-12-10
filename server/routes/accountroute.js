import express from 'express';
import account from '../models/account.js';
import bcrypt from 'bcrypt'

const router = express.Router();

// Get account
router.get('/Account', (req, res) => {
    account.find({email: req.query.email})
        .then((account) => {
            if(account.length > 0) {
                bcrypt.compare(req.query.password, account[0].password)
                .then(result => {
                    if(result){
                        const responseDetails = [{
                            email: account[0].email,
                            phoneNumber: account[0].phoneNumber,
                            firstName: account[0].firstName,
                            lastName: account[0].lastName,
                            orders: account[0].orders
                        }]
                        res.send(responseDetails);
                    } else {
                        res.send('incorrect details');
                    }
                })
            } else {
                res.send("incorrect details");
            }
        })
        .catch((err) => {
            console.log(err);
        })
})

// Create new account
router.post('/Account', (req, res) => {
    account.find({email: req.body.email})
    .then((acc) => {
        if(acc.length > 0) {
            res.send("account already exists");
        } else {

            // Hash password
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const newAccount = new account({
                    email: req.body.email,
                    password: hash,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    orders: []
                })
            
                newAccount.save()
                    .then(() => {
                        res.send("success");
                    })
                    .catch((err) => {
                        console.log(err);
                    })

            })
            .catch((err) => {
                console.log(err)
            })

        }
    })
})

// Add order to account
router.put('/placeorder', (req, res) => {
    account.find({email: req.query.email})
    .then((account) => {
        if(account.length > 0) {
            account[0].orders.push(req.body);
            account[0].save();
            res.send("success");
        }
    })
    .catch((err) => {
        console.log(err);
    })
})

// Update account details
router.put('/accountupdate', (req, res) => {
    account.find({email: req.query.email})
    .then((account) => {
        if(account.length > 0) {
            account[0].email = req.body.email;
            account[0].phoneNumber = req.body.phoneNumber;
            account[0].firstName = req.body.firstName;
            account[0].lastName = req.body.lastName;
            account[0].save();
            res.send("success");
        } else {
            res.send("account not found");
        }
    })
    .catch((err) => {
        console.log(err);
    })
})

// Change password
router.put('/changepassword', (req, res) => {
    account.find({email: req.query.email})
    .then((account => {
        if(account.length > 0) {
            bcrypt.compare(req.body.currentPass, account[0].password)
            .then(result => {
                if(result){
                    bcrypt.hash(req.body.newPass, 10)
                    .then(hash => {
                        account[0].password = hash;
                        account[0].save();
                        res.send("password changed");
                    })
                    .catch(err =>{
                        console.log(err);
                    })
                } else {
                    res.send('incorrect password');
                }
            })
            .catch((err) => {
                console.log(err);
            })
        } else {
            res.send("account not found");
        }
    }))
    .catch((err) => {
        console.log(err);
    })
})

// Delete account
router.delete('/deleteaccount', (req, res) => {
    account.find({email: req.query.email})
    .then((acc) => {
        if(acc.length > 0) {
            bcrypt.compare(req.query.password, acc[0].password)
            .then(result => {
                if(result){
                    account.deleteOne({_id: acc[0]._id})
                    .then(res.send("account deleted"))
                    .catch(err => {
                        console.log(err);
                    })
                } else {
                    res.send('incorrect password');
                }
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            res.send("account not found");
        }
    })
    .catch((err) => {
        console.log(err);
    })
})

export default router