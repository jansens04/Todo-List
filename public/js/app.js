const form = document.querySelector('#form');
const inputDay = document.querySelector('#inputDay');
const inputTodo = document.querySelector('#inputTodo');
const inputCalender = document.querySelector('#inputCalender');
const wrap = document.getElementById('wrap');

let isDone = false;
let isEdit = false;

form.addEventListener('submit', (ev) => {
  ev.preventDefault();

  if (isEdit) {
    alert('Cannot submit while in edit mode.');
    return;
  }
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
  const day = inputDay.value.toLowerCase().trim('');

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

  const getMonthValue = inputCalender.value.substring(5, 7);
  const getFulYearValue = inputCalender.value.substring(0, 4);
  const getDateValue = inputCalender.value.substring(8, 10);

  const timing = new Date();

  const fullYear = timing.getFullYear();
  const month = timing.getMonth() + 1;
  const date = timing.getDate();

  if ((getMonthValue <= month && getDateValue < date) || getFulYearValue < fullYear) {
    alert('Error: Your date has expired');
  } else {
    resultCalender += inputCalender.value;
  }

  return resultCalender;
};

const setUITodo = () => {
  card = `
            <div class="px-5 mt-10 ">
                <div class="relative border p-4 flex  items-center justify-between rounded-md">
                    <div>
                        <span class="text-sm text-indigo-800 font-medium" id="date" placeholder="Day to do Activities">${inputDay.value}  ${inputCalender.value}</span>
                        <h1 class="text-lg font-medium text-gray-900" id="todo" placeholder="Tasks you want to do">${inputTodo.value}</h1>
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

  wrap.innerHTML += card;
};

const removeTodo = (ev) => {
  const card = ev.target.closest('.relative');
  card.remove();
};

const editTodo = (ev) => {
  const target = ev.target;
  const parentCard = target.closest('.relative');

  const date = parentCard.querySelector('#date');
  const todo = parentCard.querySelector('#todo');
  isEdit = !isEdit;
  if (isEdit) {
    inputDay.value = date.innerHTML;
    inputTodo.value = todo.innerHTML;
    target.className = 'bx bx-save hover:text-green-700 active:scale-105';
    inputDay.focus();
  } else {
    if (validateCalender()) {
      date.innerText = validateCalender();
      target.className = 'bx bx-edit hover:text-green-700 active:scale-105';
    } else {
      inputDay.value = '';
      inputTodo.value = '';
      inputCalender.value = '';
    }
  }
};

const todoDone = (ev) => {
  isDone = !isDone;
  const parentCard = ev.target.closest('.relative');

  const date = parentCard.querySelector('#date');
  const todo = parentCard.querySelector('#todo');
  const work = parentCard.querySelector('#work');

  if (!isDone) {
    work.innerHTML = 'Not Done';
    date.style.textDecoration = 'none';
    todo.style.textDecoration = 'none';
  } else {
    work.innerHTML = 'Done';
    date.style.textDecoration = 'line-through';
    todo.style.textDecoration = 'line-through';
  }
};

0