// Задание 4

// Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. В input можно ввести любое число.

// При клике на кнопку происходит следующее:

// Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
// Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL  https://dummyimage.com/100x300/, где первое число — ширина картинки, второе — высота.
// Пример. Если пользователь ввёл 150 и 200, то запрос будет вида https://dummyimage.com/150x200/.
// После получения данных вывести ниже картинку на экран.

// Подсказка

// Получение данных из input:

// const value = document.querySelector('input').value;

function useRequest(url) {

  const options = {
      method: 'GET',
      mode: 'cors'
  };

  fetch(url, options)
      .then((response) => {
          console.log("responce", response)
          let url = response.url
          console.log(url)
          return url
      })
      .then((url) => {
          let cards = ""
          const cardBlock = `<div class="card">
      <img src="${url}" class="card-image"/></div>`;
          console.log(`${url}`)
          cards = cards + cardBlock;
          console.log(cards)
          resultRequest.innerHTML = cards;
      })

      .catch(() => {
          console.log('error')
      });
};


function deleteError() {
  const divErrorInput = document.querySelector(".error");
  divErrorInput.innerHTML = " ";
}

function error() {
  const divEr = document.querySelector(".error");
  const error = `<div class="error_number"><p>Числа вне диапазона от 100 до 300</p></div>`
  divEr.innerHTML = error;

  setTimeout(deleteError, 5000);

};

const resultRequest = document.querySelector(".result");
const btn = document.querySelector(".btn");


btn.addEventListener("click", async (e) => {
  console.log("start");
  let value1 = `${document.querySelector('.input__1').value}`;
  let value2 = `${document.querySelector('.input__2').value}`;
  if (value1 > 300 || value1 < 100 || value1 === 0 && value2 > 300 || value2 < 100 || value2 === 0) {
      error()
  } else {
      let valueUrl = `https://dummyimage.com/${value1}x${value2}/`
      const requestResult = await useRequest(valueUrl);
      console.log("Значение", valueUrl);
      console.log("end");
  }
}
);