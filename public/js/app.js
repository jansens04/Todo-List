const form = document.querySelector('#form');
const inputDay = document.querySelector('#inputDay');
const inputTodo = document.querySelector('#inputTodo');
const inputCalender = document.querySelector('#inputCalender');
const wrap = document.getElementById('wrap');

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  validationTodo();
});

const validationTodo = () => {
  if (validateDay() && validateCalender()) {
    alert('Your Form Success');
    setUITodo();
    inputDay.focus();
    inputDay.value = '';
    inputTodo.value = '';
    inputCalender.value = '';
  }
};

const validateDay = () => {
  let resultDay = '';
  const datasDay = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];
  const day = inputDay.value.toLowerCase();

  if (datasDay.includes(day)) {
    resultDay = inputDay.value;
  } else {
    alert('Error input your Daily');
    inputDay.focus();
  }
  return resultDay;
};

const validateCalender = () => {
  let resultCalender = '';
  const setTimingYear = '2024';
  const calender = inputCalender.value;
  let year = '';

  for (let i = 0; i < 4; i++) {
    year += calender[i];
  }

  if (year < setTimingYear) {
    alert('Error: Your date has expired');
    inputCalender.focus();
  } else {
    resultCalender = calender;
  }
  return resultCalender;
};

let isDone = false;
let card = '';
const setUITodo = () => {
  card += `
            <div class="px-5 mt-10 ">
                <div class="relative border p-4 flex  items-center justify-between rounded-md">
                    <div>
                        <span class="text-sm text-indigo-800 font-medium" id="date">${inputDay.value} , ${inputCalender.value}</span>
                        <h1 class="text-lg font-medium text-gray-900" id="todo">${inputTodo.value}</h1>
                    </div>
                    <div class="*:cursor-pointer *:duration-300 *:text-xl *:md:text-2xl">
                    <i class='bx bxs-paint  hover:text-indigo-700 active:scale-105' onclick="todoDone(event)"></i>
                        <i class='bx bx-edit  hover:text-green-700 active:scale-105' onclick="editTodo(event)"></i>
                        <i class='bx bx-trash   hover:text-red-700 active:scale-105' onclick="removeTodo(event)"></i>
                    </div>
                    <p
                        class="absolute top-0 right-1/2 translate-x-1/2 bg-indigo-500 text-sm text-gray-200 px-4 py-1 rounded-b-xl font-normal md:font-medium select-none" id="work">
                       Not Done</p>
                </div>
            </div>
    `;

  wrap.innerHTML = card;
};

const removeTodo = (ev) => {
  console.log(ev.target);
  console.log('Remove');
};

const editTodo = (ev) => {
  inputDay.focus();
  inputDay.value = 'Senin';
  inputTodo.value = 'Pergi Ke Sekolah dan Main Musik';
};

const todoDone = (ev) => {
  isDone = true;
  const parentCard = ev.target.closest('.relative');

  const date = parentCard.querySelector('#date');
  const todo = parentCard.querySelector('#todo');
  const work = parentCard.querySelector('#work');

  date.style.textDecoration = 'line-through';
  todo.style.textDecoration = 'line-through';

  !isDone ? (work.innerHTML = 'Not Done') : (work.innerHTML = 'Done');
};

// Masalah

// 1 Ketika sudah di tekan button isDone , dan ketika perbaruan data maka yang sudah di klick done tersebut akan hilang

// 2 Fitur Edit Todo Belum Jadi
