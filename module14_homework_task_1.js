// Задание 1

// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

/* Этап 1. Подготовка данных */

// Создание экземпляра класса DOMParser. Он позволит нам парсить XML
const parser = new DOMParser();

// XML, который мы будем парсить
const xmlString = `
    <list>
        <student>
            <name lang="en">
                <first>Ivan</first>
                <second>Ivanov</second>
            </name>
            <age>35</age>
            <prof>teacher</prof>
        </student>
        <student>
            <name lang="ru">
                <first>Петр</first>
                <second>Петров</second>
            </name>
            <age>58</age>
            <prof>driver</prof>
        </student>
    </list>
`;

/* Этап 2. Получение данных и их запись в результирующий объект*/

const xmlDOM = parser.parseFromString(xmlString, "text/xml");
const listNode = xmlDOM.querySelector("list");
let studentNode = listNode.querySelectorAll("student");


let result = {};
let arr = [];

for(let i = 0; i < studentNode.length; ++i) {
    let firstNameNode = studentNode[i].querySelector("first").textContent;
    let lastNameNode = studentNode[i].querySelector("second").textContent;
    let ageNode = studentNode[i].querySelector("age").textContent;
    let profNode = studentNode[i].querySelector("prof").textContent;
    let langNode = studentNode[i].querySelector("name").getAttribute('lang');
  
    result = {
       name: firstNameNode + ' ' + lastNameNode,
       age: Number(ageNode),
       prof: profNode,
       lang: langNode
    }

    arr.push(result);
};

let list = {
  list: arr
};

/* Этап 3. Вывод результата*/
console.log(list);