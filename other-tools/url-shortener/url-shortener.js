/**
 * Delto Scripts
 * Hub for open-source automation scripts.
 * https://github.com/Deltologic/delto-scripts
 *
 * Started and maintained by Deltologic. Supported by community.
**/

import express from "express";

// change server port on your needs
const PORT = 8080

// shortcut -> redirect, redirected links must have protocol
const LINKS = {
    "fb": "https://facebook.com",
    "ig": "https://instagram.com"
}

const app = express()

// register main route for handling redirections
app.get('/:shortcut', (req, res) => {
    if (req.params['shortcut'] in LINKS) {
        res.redirect(LINKS[req.params['shortcut']])
        return
    }

    // throw 404 if link wasn't found
    res.sendStatus(404)
})

app.listen(PORT, () => {
    console.log(`URL shortener is listening on ${PORT} port`);
})
