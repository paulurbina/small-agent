const { Router } = require('express')
const router = Router()
const admin = require('firebase-admin')

var serviceAccount = require("../../contactapp-74f38-firebase-adminsdk-tglfz-4c9b66fcc1");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://contactapp-74f38.firebaseio.com/'
})

const db = admin.database()

router.get('/', (req, res) => {
    db.ref('contacts').once('value', (snapshot) => {
        const  data = snapshot.val()
        res.render('index', { contacts: data })
    })
})

router.post('/new-contact', (req, res) => {
    const { firstName, lastName, email, phone } = req.body
    const newContact = { firstName, lastName, email, phone }
    db.ref('contacts').push(newContact)
    res.redirect('/')
})

router.get('/delete-contact/:id', (req, res) => {
    db.ref('contacts/' + req.params.id).remove()
    res.redirect('/')
})

module.exports = router