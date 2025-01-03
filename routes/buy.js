var express = require('express');
var router = express.Router();
const axios = require('axios'); // Используем Axios для отправки запросов

router.patch('/', async function (req, res, next) {
  var url = `https://st-api.gazprombonus.ru/v2/partners/${process.env.partner_id}/clients/` + req.body.partner_user_id;
  var payload = {
    'mesta': {
      'offer_status': 'INACTIVE',
      'date': new Date()
    }
  }

  console.log('PATCH: ' + url);
  console.log('payload: ');
  console.log(payload);

  try {
    // Отправляем POST-запрос на указанный адрес
    const response = await axios.patch(url, payload, {
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
});

module.exports = router;
