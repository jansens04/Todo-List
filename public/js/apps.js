const form = document.querySelector('#form');
const inputDay = document.querySelector('#inputDay');
const inputTodo = document.querySelector('#inputTodo');
const inputCalender = document.querySelector('#inputCalender');
const wrap = document.getElementById('wrap');

const STORAGE_TODO = 'storage_todo';
let modeEdit = false;
let isDone = false;
let idTodo = 0;

const getMaxIdFromStorage = () => {
  const getItemsTodo = localStorage.getItem(STORAGE_TODO);
  const result = JSON.parse(getItemsTodo) || [];
  const maxId = result.length > 0 ? Math.max(...result.map((item) => item.id)) : 0;
  return maxId;
};

const getStorageTodo = () => {
  const getItemsTodo = localStorage.getItem(STORAGE_TODO);
  const result = JSON.parse(getItemsTodo) || [];

  for (data of result) {
    const { id, day, todo, calender, isDone } = data;
    setUITodo(id, day, todo, calender, isDone);
  }
  return result;
};

form.addEventListener('submit', (ev) => {
  ev.preventDefault();

  validationForm();
});

const validationForm = () => {
  console.log(modeEdit);
  if (modeEdit) {
    alert('You cannot enter data because it is in Edit Mode.');
  } else {
    if (validateDay() && validateTodo() && validateCalender()) {
      setAlertSuccess();
      setTimeout(() => {
        idTodo += 1;
        setUITodo(idTodo, inputDay.value, inputTodo.value, inputCalender.value, isDone);
        setStorageUITodo(idTodo, inputDay.value, inputTodo.value, inputCalender.value, isDone);
        inputDay.value = '';
        inputTodo.value = '';
        inputCalender.value = '';
        inputDay.focus();
      }, 1700);
    }
    return false;
  }
};

// Validation Day
const validateDay = () => {
  const datasDay = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];
  const day = inputDay.value.toLowerCase().trim();

  if (datasDay.includes(day) && day.value !== '') {
    return true;
  } else {
    alert('Error input your Daily');
    inputDay.focus();
    return false;
  }
};

//   Validation Todo
const validateTodo = () => {
  if (inputTodo.value != '') {
    return true;
  } else {
    alert('Error input your Todo');
    inputTodo.focus();
  }
};

// Validation Calender
const validateCalender = () => {
  const getMonthValue = parseInt(inputCalender.value.substring(5, 7));
  const getFulYearValue = parseInt(inputCalender.value.substring(0, 4));
  const getDateValue = parseInt(inputCalender.value.substring(8, 10));

  const timing = new Date();
  const fullYear = timing.getFullYear();
  const month = timing.getMonth() + 1;
  const date = timing.getDate();

  if (getFulYearValue < fullYear || inputCalender.value == '' || (getFulYearValue === fullYear && (getMonthValue < month || (getMonthValue === month && getDateValue < date))) || String(getFulYearValue).length > 4) {
    alert('Error: Your date has expired');
    inputCalender.focus();
    false;
  } else {
    return true;
  }
};

const setUITodo = (id, day, todo, calender, isDone) => {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = id;
  card.innerHTML = `
     <div class="px-5 mt-10 " id='content'>
                    <div class="relative border p-4 flex  items-center justify-between rounded-md">
                        <div>
                            <span class="text-sm text-indigo-800 font-medium" id="date" placeholder="Day to do Activities">${day}  ${calender}</span>
                            <h1 class="text-lg font-medium text-gray-900" id="todo" placeholder="Tasks you want to do">${todo}</h1>
                        </div>
                        <div class="*:cursor-pointer *:duration-300 *:text-xl *:md:text-2xl">
                        <i class='bx bxs-paint  hover:text-indigo-700 active:scale-105' onclick="todoDone(event)"></i>
                            <i class='bx bx-edit  hover:text-green-700 active:scale-105' onclick="editTodo(event)" id='edit'></i>
                            <i class='bx bx-trash   hover:text-red-700 active:scale-105' onclick="removeTodo(event)"></i>
                        </div>
                        <p
                            class="absolute top-0 right-1/2 translate-x-1/2 bg-indigo-500 text-sm text-gray-200 px-4 py-1 rounded-b-xl font-normal md:font-medium select-none" id="work">
                           ${isDone ? 'Done' : 'Not Done'} </p>
                    </div>
                </div>
  `;

  wrap.appendChild(card);

  if (isDone) {
    const date = card.querySelector('#date');
    const todoText = card.querySelector('#todo');
    date.style.textDecoration = 'line-through';
    todoText.style.textDecoration = 'line-through';
  }
};

const todoDone = (ev) => {
  const target = ev.target;
  const parentCard = target.closest('.card');
  const date = parentCard.querySelector('#date');
  const todo = parentCard.querySelector('#todo');
  const work = parentCard.querySelector('#work');
  const todoId = parseInt(parentCard.dataset.id);

  if (work.innerHTML.trim() == 'Not Done') {
    isDone = true;
    work.innerHTML = 'Done';
    date.style.textDecoration = 'line-through';
    todo.style.textDecoration = 'line-through';
  } else {
    isDone = false;
    work.innerHTML = 'Not Done';
    date.style.textDecoration = 'none';
    todo.style.textDecoration = 'none';
  }

  syncStorageDone(todoId, isDone);
};

const editTodo = (ev) => {
  const target = ev.target;
  const parentCard = target.closest('.card');
  const date = parentCard.querySelector('#date');
  const todo = parentCard.querySelector('#todo');

  if (target.id == 'edit') {
    modeEdit = !modeEdit;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be Edit your Todo!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Edit it!',
    }).then((res) => {
      if (res.isConfirmed !== false) {
        inputDay.value = date.innerHTML;
        inputTodo.value = todo.innerHTML;
        target.className = 'bx bx-save hover:text-green-700 active:scale-105';
        target.id = 'save';
        inputDay.focus();
      }
    });
  } else {
    if (validateDay() && validateTodo() && validateCalender()) {
      Swal.fire({
        icon: 'success',
        title: 'Has been edited successfully',
        timer: 1200,
      });
      setTimeout(() => {
        target.className = 'bx bx-edit hover:text-green-700 active:scale-105';
        target.id = 'edit';
        date.innerHTML = `${inputDay.value} ${inputCalender.value}`;
        todo.innerHTML = inputTodo.value;
        updateStorageTodo(parseInt(parentCard.dataset.id), inputDay.value, inputTodo.value, inputCalender.value);
        inputDay.value = '';
        inputTodo.value = '';
        inputCalender.value = '';
      }, 1500);
    }
  }
};

const removeTodo = (ev) => {
  const parentCard = ev.target.closest('.card');
  const cardId = parseInt(parentCard.dataset.id);

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Remove it!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deleted!',
        text: 'Your Todo has been deleted.',
        icon: 'success',
        timer: 1000,
      });
      setTimeout(() => {
        parentCard.remove();
        syncStorageRemoveTodo(cardId);
      }, 1300);
    }
  });
};

const setStorageUITodo = (id, day, todo, calender) => {
  const getItemsStorage = localStorage.getItem(STORAGE_TODO);
  const itemsTodo = JSON.parse(getItemsStorage) || [];

  const dataTodos = {
    id,
    day,
    todo,
    calender,
  };

  itemsTodo.push(dataTodos);

  localStorage.setItem(STORAGE_TODO, JSON.stringify(itemsTodo));
};

const syncStorageDone = (todoId, isDone) => {
  const getItems = localStorage.getItem(STORAGE_TODO);
  const itemsTodo = JSON.parse(getItems);

  const updateTodoDone = itemsTodo.map((item) => (item.id == todoId ? { ...item, isDone } : item));

  localStorage.setItem(STORAGE_TODO, JSON.stringify(updateTodoDone));
};

const updateStorageTodo = (id, day, todo, calender) => {
  const getItems = localStorage.getItem(STORAGE_TODO);
  const itemsTodo = JSON.parse(getItems);

  const updateItem = itemsTodo.map((item) => (item.id == id ? { ...item, day, todo, calender } : item));

  localStorage.setItem(STORAGE_TODO, JSON.stringify(updateItem));
};
const syncStorageRemoveTodo = (id) => {
  const getItems = localStorage.getItem(STORAGE_TODO);
  const items = JSON.parse(getItems);

  const updateItem = items.filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_TODO, JSON.stringify(updateItem));
};

const setAlertSuccess = () => {
  return Swal.fire({
    position: 'top center',
    icon: 'success',
    title: 'Todo Success Added',
    showConfirmButton: true,
    timer: 1500,
  });
};

document.addEventListener('DOMContentLoaded', () => {
  idTodo = getMaxIdFromStorage();
  getStorageTodo();
});
