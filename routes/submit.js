const express = require('express');
const router = express.Router();
const axios = require('axios'); // Используем Axios для отправки запросов

router.post('/', async function (req, res, next) {
  console.log( `https://st-api.gazprombonus.ru/v1/partners/${process.env.partner_id}/reference/client`)
  if (req.body.email && req.body.password && req.body.agreement) {
    console.log(req.body);
    var url = `https://st-api.gazprombonus.ru/v1/partners/${process.env.partner_id}/reference/client`;
    var payload = {
      "reference": req.body.reference,
      "params": {
        "partner_user_id": req.body.email
      }
    }
    console.log('POST: '+ url);
    console.log('payload: ');
    console.log(payload);
    

    try {
      // Отправляем POST-запрос на указанный адрес
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
                  'Authorization':`Bearer ${process.env.token}`
        },
      });

      // Транслируем код ответа в клиент
      res.sendStatus(response.status);
      //res.sendStatus(200);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error.message);

      // Если произошла ошибка, возвращаем код ошибки клиенту
      if (error.response) {
        // Ошибка от сервера
        res.status(error.response.status).send(error.response.data);
        //res.sendStatus(200);
      } else {
        // Ошибка запроса
        res.sendStatus(500);
      }
    }
  } else {
    // Если данные невалидны
    res.status(400).send('Все поля (email, password, agreement) обязательны.');
  }
});

module.exports = router;
