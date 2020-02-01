// ES-6

class Profile{
  constructor(id, fullName, email, profession) {
      this.id = id;
      this.fullName = fullName;
      this.email = email;
      this.profession = profession;
  }
}

class Store{
  static addToStore(profile) {
      let profiles;
      if (localStorage.getItem('profiles') === null) {
          profiles = [];
      } else {
          profiles = JSON.parse(localStorage.getItem('profiles'));
      }
      profiles.push(profile);
      localStorage.setItem('profiles', JSON.stringify(profiles));
  }

  static getProfiles() {
      let profiles;
      if (localStorage.getItem('profiles') === null) {
          profiles = [];
      } else {
          profiles = JSON.parse(localStorage.getItem('profiles'));
      }
      return profiles;
  }

  static displayProfiles() {
      let ui = new UI();
      let profiles = Store.getProfiles();
      profiles.forEach(profile => {
          ui.addProfileToList(profile);
       });
  }

  static deleteData(id) {
      let profiles = Store.getProfiles();
      profiles.forEach((profile,index) => { 
          if (profile.id === id) {
              profiles.splice(index, 1);
          }
      });
      localStorage.setItem('profiles', JSON.stringify(profiles));
  }
}

window.addEventListener('DOMContentLoaded', Store.displayProfiles);

class UI{
  addProfileToList({ id, fullName, email, profession }) { 
      let tr = document.createElement('tr');
      tr.innerHTML = `
          <td>${fullName}</td>
          <td>${email}</td>
          <td>${profession}</td>
          <input type="hidden" data-id="${id}"/>   
          <td><i class="fa fa-trash" id="delete"></i></td> `;
      document.querySelector('#profile-list').appendChild(tr);
  };

  clearField() {
      document.querySelector('#fullName').value = '';
      document.querySelector('#email').value = '';
      document.querySelector('#profession').value = '';
  }

  deleteProfile(target) {
      if (target.id === 'delete') {
          let id = Number(target.parentElement.previousElementSibling.dataset.id);
          Store.deleteData(id);
          target.parentElement.parentElement.remove();
      }
  }

  showAlert(msg, className) {
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

  getId() {
      return document.querySelectorAll('tr').length;
  }
}

document.querySelector('form').addEventListener('submit', e => {
  let fullName = document.querySelector('#fullName').value;
  let email = document.querySelector('#email').value;
  let profession = document.querySelector('#profession').value;
  let ui = new UI();
  let id = ui.getId();
  let profile = new Profile(id, fullName, email, profession);
  if (fullName === '' || email === '' || profession === ''){
      ui.showAlert("Can't leave Empty Field!", "warning");
      ui.clearField();
  } else {
      ui.addProfileToList(profile);
      ui.showAlert("Profile Added!", "success");
      // Static Method
      Store.addToStore(profile);
      ui.clearField();
  }
  e.preventDefault();
});

document.querySelector('#profile-list').addEventListener('click', e => { 
  let ui = new UI();
  ui.deleteProfile(e.target);
  ui.showAlert("Profile Deleted!", "danger");
});