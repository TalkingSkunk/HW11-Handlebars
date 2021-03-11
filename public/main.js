const el_error = document.querySelector('#error');
const el_form = document.querySelector('#form1');
const el_textarea = document.querySelector('#textarea1');
const el_submit = document.querySelector('#submit');

function submit(event) {
    event.preventDefault();
    el_error.classList.add('d-none');
    if (el_textarea.value === ''){
        el_error.classList.remove('d-none');
        return;
    }
    el_form.setAttribute("action", "/");
    el_form.setAttribute("method", "POST");
    el_submit.removeAttribute("onClick");
    el_submit.click();
    el_form.removeAttribute("action");
    el_form.removeAttribute("method");
    el_submit.setAttribute("onClick", "submit(event)");
}