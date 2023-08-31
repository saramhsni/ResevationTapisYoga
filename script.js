
const dateButtons = document.querySelectorAll('.date-btn');
const tapisItems = document.querySelectorAll('.tapis-item');
const reserverButton = document.getElementById('reserver-btn');
const annulerButton = document.querySelector('.annuler-btn');

let selectedDate = null;
let selectedTapis = null;
let reservations = {};
//generer tapis

// function generateTapis(numberOfTapis){
//   const tapisContainer = document.getElementById('tapisContainer')
//   //suprimer tous les tapis existants
//   tapisContainer.innerHTML= '';

//   for (let i=1; i<=numberOfTapis; i++){
//     const tapisItem = document.createElement('div');
//     tapisItem.classList.add('tapis-item');
//     tapisItem.textContent= 'Tapis ' + i;
//     tapisContainer.appendChild(tapisItem);
//     tapisItem.addEventListener('click', function(){
//       selectedTapis = tapisItem
//     })
//   }
// }
function generateTapis(numberOfTapis) {
  tapisContainer.innerHTML = '';

  for (let i = 1; i <= numberOfTapis; i++) {
    const tapisItem = document.createElement('div');
    tapisItem.classList.add('tapis-item');
    tapisItem.textContent = 'Tapis ' + i;
    tapisContainer.appendChild(tapisItem);

    tapisItem.addEventListener('click', function() {
      resetSelectedTapis();
      selectedTapis = tapisItem;
      tapisItem.classList.add('selected');
    });
  }
}

// Ajouter un événement à chaque bouton de date
dateButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    resetSelectedDate();

    // Mettre à jour la sélection de la date
    selectedDate = button;
    button.classList.add('selected');

    // Afficher les tapis correspondant à la date sélectionnée
    const date = button.getAttribute('data-date');
    showTapisByDate(date);
  });
});

// Ajouter un événement à chaque tapis
tapisItems.forEach(function(tapis) {
  tapis.addEventListener('click', function() {
    resetSelectedTapis();
    // Mettre à jour la sélection du tapis
    selectedTapis = tapis;
    tapis.classList.add('selected');
  });
});

// Ajouter événement bouton de réservation
reserverButton.addEventListener('click', function() {
  if (selectedDate && selectedTapis) {
    const userName = prompt('Entrez votre nom d\'utilisateur :');
    if (reservations.hasOwnProperty(userName) && reservations[userName] === selectedDate.dataset.date) {
      alert('Vous avez déjà réservé un tapis pour cette date.');
      return;}
    selectedTapis.classList.add('reserved');
    reservations[userName] = selectedDate.dataset.date;

    resetSelectedDate();
    resetSelectedTapis();
  }
});

// Ajouter événement bouton d'annulation
annulerButton.addEventListener('click', function() {
  const userName = prompt('Entrez votre nom d\'utilisateur :');
  if (reservations.hasOwnProperty(userName) && reservations[userName] === selectedDate.dataset.date) {
    selectedTapis.classList.remove('reserved');
    delete reservations[userName];
    resetSelectedTapis();
  }else{
    alert('Vous n\'avez pas de réservation pour cette date.');
  }

  if (selectedTapis) {
    selectedTapis.classList.remove('reserved');
    resetSelectedTapis();
  }
});

function resetSelectedDate() {
  if (selectedDate) {
    selectedDate.classList.remove('selected');
    selectedDate = null;
  }
}

function resetSelectedTapis() {
  if (selectedTapis) {
    selectedTapis.classList.remove('selected');
    selectedTapis = null;
  }
}

function showTapisByDate(date) {
  tapisItems.forEach(function(tapis) {
    const tapisDate = tapis.getAttribute('data-date');
    if (tapisDate === date) {
      tapis.style.display = 'block';
    } else {
      tapis.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
    // Masquer tous les tapis
    tapisItems.forEach(function(tapis) {
      tapis.style.display = 'none';
    });
      generateTapis(5);
    // Afficher les tapis
    for (let i = 0; i <= numberOfTapis; i++) {
      tapisItems[i].style.display = 'block';
    }
    
  });
