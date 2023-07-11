//Находим элементы на странице
//Когда ищем по айди используеми #
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

//создаем массив котор будет содержать все задачи 
let tasks = [];

//если строка есть значит значение тру , если пусто то null , а это false 
if (localStorage.getItem('tasks')){
    // console.log(JSON.parse(localStorage.getItem('tasks')));

    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTask(task));

};
// метод forEach позволяет нам итерировать массив (пройтись по всем элементам) и вызвать определенную функцию для каждого элемента 
//перенесли рендер в условие иф на 5 строчек выше 
// tasks.forEach((task) => renderTask(task));
/* делаем стрелочную функцию  */
// tasks.forEach(function(task){
/* убираем след строчку дл трелочной функци */
    // renderTask(task);
//     const cssClass = task.done ?  'task-title task-title--done' :  'task-title';

// // console.log(taskText);
// // Формируем разметку для новой задачи
// const taskHTML = `
// <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
//                 <span class="${cssClass}">${task.text}</span>
//                 <div class="task-item__buttons">
//                     <button type="button" data-action="done" class="btn-action">
//                         <img src="./img/tick.svg" alt="Done" width="18" height="18">
//                     </button>
//                     <button type="button" data-action="delete" class="btn-action">
//                         <img src="./img/cross.svg" alt="Done" width="18" height="18">
//                     </button>
//                 </div>
//             </li>
// `;
// // вырезал строчки 
// //так же добавили в 1 строчку li -id="${newTask.id}"
// // <span class="task-title ">${taskText}</span>
//                 // новая запись меняем  ${taskText} на ${newTask.text}
//                 // <span class="task-title">${newTask.text}</span>

// //Добовляем задачу на страницу 
// tasksList.insertAdjacentHTML('beforeend', taskHTML);
// })

checkEmptyList ();

// пишем функцию addTask без (), что бы она не выполялась авоматически, а по кнопке submit
//добавление задачи
 
 form.addEventListener('submit', addTask);
// form.addEventListener('submit', function (event) {
//     //Отмена отправки формы
//     event.preventDefault();
//     // console.log('submit!!!')
//     // Достаем текст задачи из поля вводы 
//     const taskText = taskInput.value
//     console.log(taskText);
// // Формируем разметку для новой задачи
//     const taskHTML = `
//     <li class="list-group-item d-flex justify-content-between task-item">
// 					<span class="task-title">${taskText}</span>
// 					<div class="task-item__buttons">
// 						<button type="button" data-action="done" class="btn-action">
// 							<img src="./img/tick.svg" alt="Done" width="18" height="18">
// 						</button>
// 						<button type="button" data-action="delete" class="btn-action">
// 							<img src="./img/cross.svg" alt="Done" width="18" height="18">
// 						</button>
// 					</div>
// 				</li>
//     `;
//     //Добовляем задачу на страницу 
//     tasksList.insertAdjacentHTML('beforeend', taskHTML);
//     // console.log(taskHTML);
//     taskInput.value = "";
//     taskInput.focus();
//     if(tasksList.children.length >1 ) {
//         emptyList.classList.add('none');
//     }

function  addTask(event){
//Отмена отправки формы
event.preventDefault();
// console.log('submit!!!')
// Достаем текст задачи из поля вводы 
const taskText = taskInput.value; 

// Описываем задачу в виде обьекта
const newTask = {
    //date.now текущие время в мили секундах
    id: Date.now(),
    text: taskText,
    done: false,
};

// Добавляем задачу в массив с задачами 
tasks.push(newTask);

// Добавляем задачу в хранилище браузера локал сторадж 
saveToLocalStorage();

// console.log(tasks);
// тернарное выражение 
// const cssClass = условие ? if true : if false ; 
renderTask(newTask);

//Формируем сэсэс класс
/*  заменяем этот кусок кода на новый  */
// const cssClass = newTask.done ?  'task-title task-title--done' :  'task-title';

// // console.log(taskText);
// // Формируем разметку для новой задачи
// const taskHTML = `

// <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
//                 <span class="${cssClass}">${newTask.text}</span>
//                 <div class="task-item__buttons">
//                     <button type="button" data-action="done" class="btn-action">
//                         <img src="./img/tick.svg" alt="Done" width="18" height="18">
//                     </button>
//                     <button type="button" data-action="delete" class="btn-action">
//                         <img src="./img/cross.svg" alt="Done" width="18" height="18">
//                     </button>
//                 </div>
//             </li>
// `;
// // вырезал строчки 
// //так же добавили в 1 строчку li -id="${newTask.id}"
// // <span class="task-title ">${taskText}</span>
//                 // новая запись меняем  ${taskText} на ${newTask.text}
//                 // <span class="task-title">${newTask.text}</span>

// //Добовляем задачу на страницу 
// tasksList.insertAdjacentHTML('beforeend', taskHTML);
// // console.log(taskHTML);

//очищаем поле ввода и возвращаем фокус на него 
taskInput.value = "";
taskInput.focus();

//Перепиываем код-  эту строчку убираем 
// //Проверка. Если в списке задач более 1-го эелмента, скрываем блок СПИСОК ДЕЛ ПУСТ
// if(tasksList.children.length > 1 ) {
//     emptyList.classList.add('none');
//     //класс none прописан в css
// }
//первый способ
// saveHTMLtoLS();

checkEmptyList ();
saveToLocalStorage();
}

// Удаление задачи
//слушаем клик по всему списку
tasksList.addEventListener('click', deleteTask);

//Отмечаем задачу заввершенной
//слушаем клик по странице 
//через клик addEventListener мы можем привязывать несколько прослушек к 1 и томуже событию
//эти 2 события никак друг дргугу не мешают 
tasksList.addEventListener('click', doneTask);


                /* ОДИН СПОСОБ */ 
// //  если что-то есть по ключу , тон он вернет значение ключа 
// // если запись есть TRUE  тогда пишем дальше
// if (localStorage.getItem('tasksHTML')) { 
//     tasksList.innerHTML = localStorage.getItem('tasksHTML');
// }

// так делать не правильно, т.к. локал сторадж  нужно для хранения чистых данных 

//Функции 

function doneTask (event) {

                           //Упрощаем 
    // // console.log('doneTask')
    // if (event.target.dataset.action === 'done') {
    //     // console.log('done!!!')
    //     //для реализации выполенено мы добавляем к задаче спец класс task-title--done 
    //     //находим данный спан в разметке и добавить ему класс. Ищем его по кнопке , потом поднимемсся вверх до род элемента тега  li 
    //     // потом отталкиваемся от него мы найдем тег спан с нужжным классом и добавим нужный класс
    //     const parentNode = event.target.closest('.list-group-item');
    //     // console.log(parentNode)
    //     //querySelector можно вызывать у любого HTML элемента не только у document 
    //     const taskTitle = parentNode.querySelector('.task-title');
    //     // console.log(taskTitle);
    //     // когда работаем через класс лист передаем без точки 
    //     taskTitle.classList.toggle('task-title--done');
    //     // taskTitle.classList.add('task-title--done');
    // } 

                                    // Упростили
//Проверяем если клик был не по кнопке ЗАДАЧА ВЫПОЛНЕНА 
if (event.target.dataset.action !== 'done') return; 

         const parentNode = event.target.closest('.list-group-item');
         // Определяем Айди задачи 
const id = Number(parentNode.id);
    /* стрелочная функция */
    const task =tasks.find((task) => task.id === id);

// метод find работем как findIndex, только он возвращает не индекс элемента а найденный элемент 
//  const task =tasks.find(function(task){
//  if(task.id === id) {
//     return true 
//  }
// })
// //метод find возвращает ссылку на обьект , и в такс лежит ссылка 
// // false = true 
task.done = !task.done
// console.log(task);

saveToLocalStorage();

         const taskTitle = parentNode.querySelector('.task-title');
         taskTitle.classList.toggle('task-title--done');
         //первый способ
        //  saveHTMLtoLS();
}



// в scc прописано свойство button-action , этим свойством мы снимаем все элементы с этого события 
//  и клик проходит сквозь него, если бы не он то мы бы кликали на картинку и попадаем сраззу в кнопку
// есть свойсто data/action  data.action = done , data.actin = delete смотрим на значение атрибута

function deleteTask(event){
    // console.log(event.target);
    // console.log('deleteTask');
    // если event.targer  обращаемс к его артрибуту , через свой-во dataset . action (data писать не надо)

                                // упрощаем 
    // if(event.target.dataset.action === 'delete') {
    //     // console.log('delete');
    //     //ищем родителей кнопки через closest
    //      const parenNode = event.target.closest('.list-group-item');
    //     //  console.log(parenNode);
    //     parenNode.remove();
    //     // = присвоить == нестрогое сранвение === строгое сравнение
    //     if(tasksList.children.length === 1 ) {
    //         emptyList.classList.remove('none');
    //         //класс none прописан в css
    //     }
    // }
                    // упростили 

    // Проверяем если клик был не по кнопке УДАЛИТЬ ЗАДАЧУ 
                    if (event.target.dataset.action !== 'delete')  return ;
//если клинули не туда , функц завершает свою работу, иначе тогда 
         const parenNode = event.target.closest('.list-group-item');

// Определяем ID задачи
// const id = parenNode.id
const id = Number(parenNode.id)
// console.log(parenNode.id);

// Находим индекс задачи в массиве 
// 197 переводим в стрелочную функцию 
//  const index = tasks.findIndex(function(task){
    // const index = tasks.findIndex((task) => task.id === id); коментриуем для реализации 2 способа удаления из массива 

// console.log(task);
//if (task.id == id)

// упрощаем код 204,205 на 208  но код может сползти
// if (task.id === id) {
//     return true ;
// }
// при замене на стрелочную функцию return не нужен
    // return task.id === id;
// })
 
// console.log(index);
// удалить эл-т из массива  можно 2 способами : 1- найти индекс эл-та и вырезать  эл-т по индексу
// 2- отфлитровать массив, чтоб в массив попали все задачи кроме той котрую мы хотим удалить 

// Удаляем задачу из массива с задачами 
//  splice вырезаем с index ,  кол-во элементов 
//  tasks.splice(index, 1) коментриуем для реализации 2 способа удаления из массива 

// все элементы что будут тру попадут в новый массив , а те что false нет 
// Ссокращенный код 
/* стрелочная  */ // удаляем  задачу через фильтрацию массива 
tasks = tasks.filter((task) => task.id !== id);
            /* Новая версия */
// tasks = tasks.filter(function(task) {
//  return task.id !== id;

// tasks = tasks.filter(function(task) {
//     if (task.id === id) {
//         return false
//     } else {
//         return true
//     }
//     // важно для работы этого метода  чтоб let tasks = [];  через let ? через const работать не будет 
// })
saveToLocalStorage();
// console.log(tasks);
        //  //Удаляем задачу из разметки
         parenNode.remove();

         //Переписываем код эти строчки переписываем
// //Проверка. Если в списке задач 1 элемент, показываем 
//         if(tasksList.children.length === 1 ) {
//         emptyList.classList.remove('none');
//         }
              //первый способ
            //   saveHTMLtoLS();

            checkEmptyList ();
            }


            // Простой способ с localStorage, но неправильный 
            // ls сокращ local Storage


                                   /* ПРОДОЛЖЕНИЕ 1ГО СПОСОБА */
            // //функ котор сохр разметку списка в ls
            // // нам это нужно при каждом удал или добавл  по этому добавим  saveHTMLtoLS(); в конце функций 
            // //function deleteTask(event) , function doneTask (event), function  addTask(event)
            // function saveHTMLtoLS() {
            //     //обращаем к ls по ключу  taskHTML  записываем разметку .  Сво-во innerHTML возвращ весь внутр HTML котор наход в данном элем-те
            //     localStorage.setItem('tasksHTML', tasksList.innerHTML);
            // }

            function checkEmptyList () {
                if (tasks.length === 0) {
                    const emptyListElement = `
                    <li id="emptyList" class="list-group-item empty-list">
					
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;
                tasksList.insertAdjacentHTML('afterbegin', emptyListElement);
                }

                if (tasks.length > 0) {
                    const emptyListEl = document.querySelector('#emptyList');
                    emptyListEl ? emptyListEl.remove() : null;
                }
            };

            function saveToLocalStorage(){
                // обращемся к лс сторадж , вызываем метод setItem . Первым аргументом передаем ключ tasks
                //2 аргументом вызываем JSON.stringify  и в него передаем tasks
                localStorage.setItem('tasks', JSON.stringify(tasks))
            };

            function renderTask(task) {
                const cssClass = task.done ?  'task-title task-title--done' :  'task-title';

                // console.log(taskText);
                // Формируем разметку для новой задачи
                const taskHTML = `
                <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                                <span class="${cssClass}">${task.text}</span>
                                <div class="task-item__buttons">
                                    <button type="button" data-action="done" class="btn-action">
                                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                    </button>
                                    <button type="button" data-action="delete" class="btn-action">
                                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                                    </button>
                                </div>
                            </li>
                `;
                // вырезал строчки 
                //так же добавили в 1 строчку li -id="${newTask.id}"
                // <span class="task-title ">${taskText}</span>
                                // новая запись меняем  ${taskText} на ${newTask.text}
                                // <span class="task-title">${newTask.text}</span>
                
                //Добовляем задачу на страницу 
                tasksList.insertAdjacentHTML('beforeend', taskHTML);
            }



              /* Усовершенствуем код */
// const input = document.querySelector('#input');
// const btn = document.querySelector('#btn');
// const result = document.querySelector('#result');
// const total = document.querySelector('#total');
// let i=0

// //Добавляем событие на кнопку
// btn.addEventListener('click', (e) => {
//     // console.log(input.value);
//     // result.innerHTML += `<li>${input.value}</li>`
//     if(input.value === ' ') return;
//     createDeleteElements(input.value);
//     input.value = '';
    
// })
// //создание и удаление  todo
// function createDeleteElements(value) {
//     // console.log(value);
//     i++;
//     const li = document.createElement('li') ;
//     const btn = document.createElement('button');
    
//     li.className = 'li';
//     li.textContent = value;

//     btn.className = 'btn';
//     btn.textContent = 'X';
//     li.appendChild(btn);

//     //удаляем todo
//     btn.addEventListener('click', (e)=> {
//         i--;
//         total.textContent = i;
//         // console.log(li);
//         //Удаляем дочерний узел
//         result.removeChild(li)
//     });
//     // Переключаем активный класс 
//     li.addEventListener('click', (e) => {
//         li.classList.toggle('li-active');         
//     });

//     total.textContent = i;
//     result.appendChild(li);
// }