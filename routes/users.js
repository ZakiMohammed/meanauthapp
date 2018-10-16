const express = require('express');
const router = express.Router();

router.get('/register', (request, response, next) => {
    response.send('Register');
});
router.post('/authenticate', (request, response, next) => {
    response.send('Authenticate');
});
router.get('/profile', (request, response, next) => {
    response.send('Profile');
});

module.exports = router;