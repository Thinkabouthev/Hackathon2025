# Инструкция по добавлению фонового изображения

## Добавление фонового изображения

Чтобы добавить фоновое изображение вместо градиента:

1. Поместите ваше изображение в папку `src/assets/images/` (например, background.jpg)
2. Откройте файл `src/components/Hero.js`
3. Раскомментируйте строку импорта изображения:
   ```js
   import backgroundImage from "../assets/images/background.jpg";
   ```
4. Раскомментируйте и используйте строку с настройкой фона:
   ```js
   background: `url(${backgroundImage})`,
   ```
5. Закомментируйте или удалите строку с градиентом:
   ```js
   // background: 'linear-gradient(135deg, #3a3a3a, #1a1a1a)'
   ```

## Размеры и формат изображения

Для наилучшего результата:

- Используйте широкоформатное изображение высокого разрешения (не менее 1920x1080 пикселей)
- Предпочтительные форматы: JPG или WebP для фотографий
- Оптимизируйте изображение для веб (размер файла менее 1 МБ для лучшей производительности)
- Выбирайте изображение с достаточным контрастом, чтобы белый текст был хорошо читаем
