// Задание 5.

// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://jsonplaceholder.typicode.com/photos?_page=0&_limit=8, где GET-параметр _page — это число из первого input, а GET-параметр _limit — это введённое число второго input.
// Пример. Если пользователь ввёл 5 и 8, то запрос будет вида https://jsonplaceholder.typicode.com/photos?_page=5&_limit=8.
// После получения данных вывести список картинок на экран.

// Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).


function useRequest(url, cb) {
    let xhr = new XMLHttpRequest();
  
    xhr.open("GET", url, true);
  
    xhr.onload = function () {
        if (xhr.status != 200) {
            console.log('Статус ответа:' `${xhr.status}`)
        } else {
            let result = JSON.parse(xhr.response);
  
            console.log("Результат:", JSON.parse(xhr.response));
            if (cb) {
                cb(result);
            }
        }
    };
    xhr.onerror = function () {
        console.log("Ошибка! Статус ответа:", xhr.status);
    };
  
    xhr.send();
  };
  
  function displayResult(apiData) {
    let cards = "";
    apiData.forEach((item, index, array) => {
        const cardBlock = `
        <div class="card">
        <img src="${item.url}" alt="${item.title}" class="card-image"/>
        </div>
        `;
        cards = cards + cardBlock;
        localStorage.setItem("localDiv", cards)
    });
    console.log(cards)
    resultRequest.innerHTML = cards;
  }
  
  const showImages = () => {
    const images = localStorage.getItem("localDiv");
    if (images) {
        const imageDivLocalStorage = document.querySelector(".result");
        imageDivLocalStorage.insertAdjacentHTML('afterend', images);
        console.log("После получения запроса, данные LocalStorage - будут удалены через 20 секунд")
        setTimeout(clearStorage, 20000);
    } else {
        console.log("пустой")
    }
  }
  
  document.addEventListener("DOMContentLoaded", showImages)
  
  function clearStorage() {
    localStorage.clear();
  }
  
  function deleteError() {
    const divErrorInput = document.querySelector(".error");
    divErrorInput.innerHTML = " ";
  }
  
  function error(message) {
    const errorMessage = message;
    const divEr = document.querySelector(".error");
    const error = `<div class="error_number"><p> ${errorMessage} вне диапазона от 1 до 10</p></div>`
    divEr.innerHTML = error;
  
    setTimeout(deleteError, 5000);
  
  };
  
  const resultRequest = document.querySelector(".result");
  const btn = document.querySelector(".btn");
  
  
  btn.addEventListener("click", async (e) => {
    console.log("start");
    let value1 = `${document.querySelector('.input__1').value}`;
    let value2 = `${document.querySelector('.input__2').value}`;
    if (value1 > 10 || value1 < 1) {
        if (value2 > 10 || value2 < 1) {
            error("Номер страницы и лимит")
        }
        else {
            error("Номер страницы")
        }
    }
    else if (value2 > 10 || value2 < 1) {
        error("Лимит")
    }
    else {
        let valueUrl = `https://jsonplaceholder.typicode.com/photos?_page=${value1}&limit=${value2}`
        const requestResult = useRequest(valueUrl, displayResult);
        console.log("Значение", valueUrl);
        console.log("end")
    }
  });