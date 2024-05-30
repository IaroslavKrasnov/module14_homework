// Задание 3

// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://jsonplaceholder.typicode.com/photos?_limit=5, где get-параметр limit — это введённое число.
// Пример. Если пользователь ввёл 8, то запрос будет вида: https://jsonplaceholder.typicode.com/photos?_limit=8.
// После получения данных вывести ниже картинки на экран.

// Подсказка

// Получение данных из input:

// const value = document.querySelector('input').value;


// Получаем элементы со страницы
const inputNumber = document.querySelector('input');
const btn = document.querySelector('.button');
const images = document.querySelector('.images');

// Обработчик клика по кнопке
btn.addEventListener('click', function() {
    // Получаем введенное число
    const number = inputNumber.value;
     // Проверяем, попадает ли число в диапазон от 1 до 10
  if (number < 1 || number > 10) {
    // Выводим сообщение об ошибке
    images.innerHTML = 'Число вне диапазона от 1 до 10';
  } else {
    // Формируем URL-адрес запроса
    const url = `https://jsonplaceholder.typicode.com/photos?_limit=${number}`;

    // Создаем новый объект XMLHttpRequest
    const xhr = new XMLHttpRequest();

     // Открываем соединение и указываем путь к файлу
     xhr.open('GET', url);

     // Обработчик события загрузки
     xhr.onload = function() {
       // Получаем данные из ответа
       const data = JSON.parse(xhr.response);
 
       // Генерируем HTML-код картинок
       let html = '';
       data.forEach(function(item) {
         html += `<img src="${item.url}" alt="${item.title}">`;
       });
 
       // Выводим HTML-код на страницу
       images.innerHTML = html;
     };
 
     // Отправляем запрос
     xhr.send();
   }
 });