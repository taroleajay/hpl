const express = require('express');
const XLSX = require('xlsx');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Serve static files (for frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve data from Excel
app.get('/data', (req, res) => {
    const workbook = XLSX.readFile(path.join(__dirname, 'data.xlsx')); // Assuming you have an Excel file named data.xlsx
    const sheetNameList = workbook.SheetNames;
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);
    res.json(jsonData);
});

// Serve a basic HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
