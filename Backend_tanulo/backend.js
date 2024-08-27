const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let tanulok = [];
let nextId = 1; // Következő azonosító

// JSON fájl betöltése
fs.readFile('tanulok.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Hiba a JSON fájl betöltésekor:', err);
    } else {
        tanulok = JSON.parse(data);
        console.log('Tanulók adatai betöltve.');
        
        // Legnagyobb ID meghatározása a JSON fájlból
        const maxId = tanulok.reduce((max, tanulo) => Math.max(max, tanulo.id), 0);
        nextId = maxId + 1;
    }
});

// Összes tanuló lekérése
app.get('/tanulok', (req, res) => {
    res.json({
        message: 'Sikeres lekérdezés',
        status: 'success',
        data: tanulok
    });
});

// Tanuló lekérése ID alapján
app.get('/tanulok/:id', (req, res) => {
    const tanuloId = parseInt(req.params.id, 10);
    
    const tanulo = tanulok.find(t => t.id === tanuloId);
    if (!tanulo) {
        return res.json({ message: 'Nem található ilyen ID-vel tanuló.', status: 'error', data: null });
    }
    return res.json({ message: 'Tanuló sikeresen lekérve.', status: 'success', data: tanulo });
});

// Új tanuló hozzáadása
app.post('/tanulok', (req, res) => {
    const newTanulo = {...req.body }; // Az ID automatikusan növekszik
    newTanulo.id = ++nextId;
    
    tanulok.push(newTanulo);
    return res.json({ message: 'Tanuló sikeresen hozzáadva.', status: 'success', data: newTanulo });
});

// Tanuló módosítása ID alapján
app.put('/tanulok/:id', (req, res) => {
    const tanuloId = parseInt(req.params.id, 10);
    const index = tanulok.findIndex(t => t.id === tanuloId);
    if (index === -1) {
        return res.json({ message: 'Nem található ilyen ID-vel tanuló.', status: 'error', data: null });
    }
    tanulok[index] = { ...tanulok[index], ...req.body };
    return res.json({ message: 'Tanuló sikeresen módosítva.', status: 'success', data: tanulok[index] });
});

// Tanuló törlése ID alapján
app.delete('/tanulok/:id', (req, res) => {
    const tanuloId = parseInt(req.params.id, 10);
    const index = tanulok.findIndex(t => t.id === tanuloId);
    if (index === -1) {
        return res.json({ message: 'Nem található ilyen ID-vel tanuló.', status: 'error', data: null });
    }
    const deletedTanulo = tanulok.splice(index, 1);
    return res.json({ message: 'Tanuló sikeresen törölve.', status: 'success', data: deletedTanulo[0] });
});

// Szerver indítása
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Szerver fut a következő porton: ${PORT}`);
});
