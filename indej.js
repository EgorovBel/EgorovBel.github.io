const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Обработчик запроса на получение времени для пользователя
app.get('/getTime/:userId', (req, res) => {
    const userId = req.params.userId;

    // Читаем данные из файла JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла', err);
            res.status(500).json({ error: 'Ошибка чтения файла' });
            return;
        }

        const usersData = JSON.parse(data);
        const startTime = usersData[userId] || null;

        res.json({ startTime });
    });
});

// Обработчик запроса на обновление времени для пользователя
app.post('/updateTime/:userId', (req, res) => {
    const userId = req.params.userId;
    const currentTime = new Date().toISOString();

    // Читаем данные из файла JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка чтения файла', err);
            res.status(500).json({ error: 'Ошибка чтения файла' });
            return;
        }

        const usersData = JSON.parse(data);
        usersData[userId] = currentTime;

        // Записываем обновленные данные в файл JSON
        fs.writeFile('data.json', JSON.stringify(usersData, null, 2), (err) => {
            if (err) {
                console.error('Ошибка записи файла', err);
                res.status(500).json({ error: 'Ошибка записи файла' });
                return;
            }

            res.json({ success: true });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});