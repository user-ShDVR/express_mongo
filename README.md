Привет!

**Это проект на Express + MongoDB.**
В проекте реализовано:
  **Регистрация с валидацией.** Поля: name, email, password, birth_date, gender, avatarUrl.
  **Авторизация с валидацией.** Поля: email, password.
  **Профиль пользователя** (маршрут auth/me), содержащий информацию о пользователе
  **Обновление пользователя с валидацией**: name, password, фото профиля (users/update).
  **Аккаунты других пользователей** (маршрут /users): при запросе отображается список всех пользователей кроме текущего.

Для запуска проекта необходимо:
**1.** Установить зависимости:
```
npm i
```
**2.** Отредактировать строку MONGODB_URI в файле .env
**3.** Запустить проект:
```
npm run start
```

