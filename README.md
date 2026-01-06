# Express + PUG + EJS + Cookies + JWT

Сервер на Node.js + Express зі змішаними шаблонізаторами (PUG/EJS), статичними файлами, підтримкою cookies для збереження теми та авторизацією через JWT.

## Встановлення та запуск

```bash
npm install
npm start           # або npm run start-local для nodemon
```

Налаштування через змінні середовища:

- `PORT` — порт сервера (за замовчуванням `3000`).
- `JWT_SECRET` — секрет для підпису JWT (значення за замовчуванням виставлене для локальної розробки).
- `SESSION_SECRET` — секрет для сесій express-session (за замовчуванням dev-значення).
- `COOKIE_SAMESITE` — політика SameSite для cookies (`lax` за замовчуванням).
- `COOKIE_SECURE` — `true` щоб віддавати cookies лише по HTTPS (автоматично true у production).

## HTML-сторінки (SSR)

- `GET /` — лічильник переглядів сесії у відповідь.
- `GET /users`, `GET /users/:userId` — PUG-сторінки зі списком та деталями користувача.
- `GET /articles`, `GET /articles/:articleId` — EJS-сторінки зі списком та деталями статті.

Усі сторінки використовують стилі `public/styles.css` та фавікон `public/favicon.ico` (підтягнуті через `<link rel="icon" href="/favicon.ico">`).

## JSON API

### Users API (`/api/users`)

- Вимагає хедер `Authorization` (для всіх методів, окрім GET у HTML-сторінках).
- `GET /api/users` — список користувачів
- `GET /api/users/:userId` — деталі користувача
- `POST /api/users` — створити користувача (`username`, `email` обовʼязкові)
- `PUT /api/users/:userId` — замінити користувача
- `PATCH /api/users/:userId` — частково оновити користувача
- `DELETE /api/users/:userId` — видалити користувача

### Articles API (`/api/articles`)

- Вимагає хедер `x-article-role: editor` (для безпеки POST/PUT/PATCH/DELETE).
- `GET /api/articles` — список статей
- `GET /api/articles/:articleId` — деталі статті
- `POST /api/articles` — створити статтю
- `PUT /api/articles/:articleId` — замінити статтю
- `PATCH /api/articles/:articleId` — часткове оновлення
- `DELETE /api/articles/:articleId` — видалити статтю

## Cookies: збереження теми

Cookie-parser підключений глобально. Маршрути для налаштувань теми (`/preferences/theme`) працюють із cookies:

- `GET /preferences/theme` — повертає поточну тему з cookie (`{ theme }`, за замовчуванням `light`).
- `POST /preferences/theme` — зберігає тему, передану у `theme` (body або query), у cookie на 30 днів.

## JWT-авторизація

Токен зберігається у httpOnly cookie `auth_token` (SameSite=Lax).

- `POST /api/auth/register` — `username`, `email`, `password` → створення користувача + видача JWT у cookie.
- `POST /api/auth/login` — `username`, `password` → перевірка та видача JWT у cookie.
- `GET /api/auth/me` — захищений маршрут із мідлварою перевірки JWT; повертає дані поточного користувача.
- `POST /api/auth/logout` — очищає cookie з токеном.

Мідлвара перевірки токена: `src/middlewares/jwtAuth.js` — читає JWT із cookie `auth_token` або заголовка `Authorization: Bearer <token>` і додає payload у `req.user`.

## Статичні файли

- Вся статика віддається з `public/` (`express.static`).
- `public/favicon.ico` віддається окремо на `/favicon.ico` та підключений у всі шаблони.

## Логування та помилки

- **Morgan** використовується для логування (формат `dev` у development, `combined` у production).
- Глобальний обробник помилок — `src/middlewares/errorHandler.js`; для `/api/*` повертає JSON `{ error }`, для HTML — текст.
- 404 обробник: для `/api/*` — JSON `{ error: 'Not found' }`, для HTML — текст `Not found`.

## Структура

```
project/
├── server.js                 # запуск Express, статика, PUG/EJS, cookies, сесії, маршрути
├── package.json
├── public/
│   ├── favicon.ico           # фавікон
│   └── styles.css            # стилі для HTML-сторінок
├── views/
│   ├── articles/
│   │   ├── list.ejs          # список статей (EJS)
│   │   └── detail.ejs        # деталі статті (EJS)
│   └── users/
│       ├── list.pug          # список користувачів (PUG)
│       └── detail.pug        # деталі користувача (PUG)
└── src/
	├── routes/               # оголошення маршрутів
	│   ├── homeRoutes.js     # /
	│   ├── userRoutes.js     # /users (HTML)
	│   ├── articleRoutes.js  # /articles (HTML)
	│   ├── apiUserRoutes.js  # /api/users (JSON)
	│   ├── apiArticleRoutes.js # /api/articles (JSON)
	│   ├── preferencesRoutes.js # /preferences/theme (cookies)
	│   └── authRoutes.js     # /api/auth (JWT)
	├── controllers/          # бізнес-логіка
	│   ├── homeController.js
	│   ├── usersController.js
	│   ├── articlesController.js
	│   ├── apiUsersController.js
	│   ├── apiArticlesController.js
	│   ├── preferencesController.js
	│   └── authController.js
	├── middlewares/
	│   ├── auth.js
	│   ├── apiAuth.js
	│   ├── checkArticleAccess.js
	│   ├── apiCheckArticleAccess.js
	│   ├── jwtAuth.js
	│   ├── validateUserData.js
	│   └── errorHandler.js
	└── data/
		├── usersStore.js     # in-memory користувачі, хешування паролів
		└── articlesStore.js  # in-memory статті
```
