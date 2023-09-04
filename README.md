# nest-cars-application

## Зависимости

- node >= 18.17.1
- typescript >= 5.1.3
- mongodb >= 7.0.0

## Установка

- server

  - Выполнить установку зависимостей `npm i --dev`
  - Запустить линтер `npm run lint`
  - Запустить тесты `npm run test` и `npm run test:e2e`
  - Запустить backend-api `npm start`

- client

  - Выполнить установку зависимостей `npm i --dev`
  - Запустить скрипт `node dest/main.js`

## Запуск server в Docker

- Запуск тестов командой `make tests`
- Запустить приложение с базой `make start`
- Остановить приложение с базой `make stop`

## Запросы через client приложение

Аргументы скрипта:

- Вывести помощь по скрипты `--help`, `-h`
- Адрес хоста API `--host`, `-u`
- Метод запроса  `--method`, `-m`, Доступные: [GET, POST, PUT, DELETE]
- Роут запроса `--route`, `-r` Доступные: cars
- Тело запроса `--body`, `-d`, Пример: '{"key":"value"}', Доступно только для POST, PUT методов
- Поиск по имени `--search`, `-s`, Доступно только для метода GET /cars
- Поиск по бренду `--brand`, `-b`, Доступно только для метода GET /cars
- Фильтрация по цене от `--price_from`, `-f`, Доступно только для метода GET /cars
- Фильтрация по цене до `--price_to`, `-t`, Доступно только для метода GET /cars
- Сортировка поля по возрастанию или убыванию `--sort`, `-o`, Доступно только для метода GET /cars
- Ограничение на количество документов в ответе `--limit`, `-l`, Доступно только для метода GET /cars

Примеры запросов:

- Create POST, `node dist/main.js -u http://localhost -m POST -r cars -d '{"name":"AE86","brand":"toyota","manufacture":1986,"price":300000}'`
- Update PUT, `node dist/main.js -u http://localhost -m PUT -r cars/64f494b344c24730fdbae7ea -d '{"name":"AE-86","brand":"toyota","manufacture":1987,"price":360000}'`
- Find all GET, `node dist/main.js -u http://localhost -m GET -r cars`
- Find one GET, `node dist/main.js -u http://localhost -m GET -r cars/64f494b344c24730fdbae7ea`
- Delete one DELETE, `node dist/main.js -u http://localhost -m DELETE -r cars/64f494b344c24730fdbae7ea`
