const refs = {
  formData: {
    email: '',
    message: '',
  },
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

loadFormData();
refs.form.addEventListener('input', recordFormData);
refs.form.addEventListener('submit', sendForm);

function recordFormData(event) {
  if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
    const { name, value } = event.target;
    refs.formData[name] = value.trim();
    localStorage.setItem('feedback-form-state', JSON.stringify(refs.formData));
  }
}

function loadFormData() {
  const userFormData = localStorage.getItem('feedback-form-state');
  if (userFormData) {
    try {
      const userFormDataParse = JSON.parse(userFormData);
      refs.formData = { ...refs.formData, ...userFormDataParse };
      refs.input.value = refs.formData.email || '';
      refs.textarea.value = refs.formData.message || '';
    } catch (error) {
      console.log(error.name);
    }
  }
}

function sendForm(event) {
  event.preventDefault();
  if (!refs.formData.email.trim() || !refs.formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }
  console.log(refs.formData);
  localStorage.removeItem('feedback-form-state');
  refs.formData = { email: '', message: '' };
  refs.form.reset();
}

console.log(refs.formData.message.length);
