// Written in ES-5

function Profile(fullName,email,profession) {
  this.fullName = fullName;
  this.email = email;
  this.profession = profession;
}

function UI() { }
let ui = new UI();

UI.prototype.clearField = function () {
  document.querySelector('#fullName').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('#profession').value = '';
}
UI.prototype.deleteProfile = function (target) { 
  if (target.id === 'delete') {
      target.parentElement.parentElement.remove();
  }
};
UI.prototype.showAlert = function (msg, className) {
  let form = document.querySelector('form');
  let container = document.querySelector('.container');
  let div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.textContent = msg;
  container.insertBefore(div, form);
  setTimeout(() => { 
      document.querySelector('.alert').remove();
  }, 2000);
}
UI.prototype.addProfileToList = function ({fullName, email, profession}) {

  let tr = document.createElement('tr');
  tr.innerHTML = `
          <td>${fullName}</td>
          <td>${email}</td>
          <td>${profession}</td>
          <td><i class="fa fa-trash" id="delete"></i></td>
  `;
  document.querySelector('#profile-list').appendChild(tr);
  }

document.querySelector('form').addEventListener('submit', e => {
  let fullName = document.querySelector('#fullName').value;
  let email = document.querySelector('#email').value;
  let profession = document.querySelector('#profession').value;
  let profile = new Profile(fullName, email, profession);
  if (fullName === '' || email === '' || profession === ''){
      ui.showAlert("Can't leave Empty Field!", "warning");
      ui.clearField();
  } else {
      ui.addProfileToList(profile);
      ui.showAlert("Profile Added!", "success");
      ui.clearField();
  }
  e.preventDefault();
});

document.querySelector('#profile-list').addEventListener('click', e => { 
  ui.deleteProfile(e.target);
  ui.showAlert("Profile Deleted!", "danger");
});