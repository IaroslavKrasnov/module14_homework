// Задание 2

// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать JSON в JS-объект и выводить его в консоль.

/* Этап 1. Подготовка данных */

// JSON, который мы будем парсить
const jsonString = `{
    "list": [
     {
      "name": "Petr",
      "age": "20",
      "prof": "mechanic"
     },
     {
      "name": "Vova",
      "age": "60",
      "prof": "pilot"
     }
    ]
   }`;
   
/* Этап 2. Получение данных и их запись в результирующий объект*/

const jsonObject = JSON.parse(jsonString);

const result = {
    list: []
};


jsonObject.list.forEach(function(item) {
    const name = item.name;
    const age = Number(item.age);
    const prof = item.prof;

    result.list.push({
    name: name,
    age: age,
    prof: prof
    });
});
   
/* Этап 3. Вывод результата*/
console.log(result);