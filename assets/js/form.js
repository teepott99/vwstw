(function () {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUMDpHSSmPhs1L8iso8le0zo067YO7RM4CXxeZ5qx0Kq3dsPc/exec'
  const form = document.forms['submit-to-google-sheet']
  const cors = 'https://cors-anywhere.herokuapp.com/';
  // Vars.
  let $form = document.querySelectorAll('#signup-form')[0];
  let $message;
  // Bail if addEventListener isn't supported.
  if (!('addEventListener' in $form))
    return;
  // Message.
  $message = document.createElement('span');
  $message.classList.add('message');
  $form.appendChild($message);
  $message._show = function (type, text) {
    $message.innerHTML = text;
    $message.classList.add(type);
    $message.classList.add('visible');
    window.setTimeout(function () { $message._hide(); }, 3000);

  };
  $message._hide = function () { $message.classList.remove('visible'); };
  $form.addEventListener('submit', e => {
    e.preventDefault();
    $message._hide();
    fetch(cors + scriptURL, { method: 'POST', body: new FormData(form) })
      .then((response) => { $message._show('success', 'Thank You!'); $form.reset(); return response; })
      .catch((error) => { $message._show('failure', `Something went wrong. Please try again.${ error.message }`); })
  });
})();
