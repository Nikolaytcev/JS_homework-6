const insertText = document.getElementById('task__input');
const form = document.getElementById('tasks__form');
const taskList = document.getElementById('tasks__list');



function deleteTask(div) {
    const link = div.querySelector('.task__remove')
    link.addEventListener('click', (evt) => {
        evt.preventDefault();
        taskList.removeChild(link.closest('.task'));
        localStorage.setItem('hiden', taskList.innerHTML);
});
};

function addText(text) {
    const div = document.createElement('div');
    div.className = 'task';
    div.innerHTML = `<div class='task__title'>${text}</div>
    <a href="#" class="task__remove">&times;</a>`;
    taskList.appendChild(div);
    localStorage.setItem('hiden', taskList.innerHTML);
    
    deleteTask(div)
};

taskList.innerHTML = localStorage.getItem('hiden');
document.querySelectorAll('.task').forEach((e) => {
    deleteTask(e);
});

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (insertText.value) {addText(insertText.value)};
    insertText.value = ''
})






