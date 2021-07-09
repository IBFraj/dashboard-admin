const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('*', (req, res) => {
    let html = fs.readFileSync(path.resolve(__dirname, '..', 'public', 'index.html'));
    html = html.toString();
    return res.send(html);
});
module.exports = router;
