const express = require('express')
const path = require('path')
const app = express()
const PORT = 5050;

const stylesDirectory = path.join(__dirname, './styles')
const assetsDirectory = path.join(__dirname, './assets')
const vuesDirectory = path.join(__dirname, './vues')
const scriptsDirectory = path.join(__dirname, './scripts')

app.use(express.static(assetsDirectory))
app.use(express.static(stylesDirectory))
app.use(express.static(vuesDirectory))
app.use(express.static(scriptsDirectory))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile("index.html")
})

app.listen(PORT, () => {
    console.log(`⚡️ Server is running on port ${PORT} ⚡️`);
});