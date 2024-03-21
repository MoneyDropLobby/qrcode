const express = require('express');
const multer = require('multer');
const QRCode = require('qrcode');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), function (req, res) {
    
    res.send('Datei erfolgreich hochgeladen');
});

app.get('/generate-qr', async (req, res) => {
    try {
        const qrCodeUrl = await QRCode.toDataURL('http://example.com/upload');
        res.send(`<img src="${qrCodeUrl}">`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Fehler beim Generieren des QR-Codes');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});
