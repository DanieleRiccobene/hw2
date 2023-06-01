const modale = document.querySelector('#modalBenvenuto');
const image = document.createElement('img');
const container = document.querySelector('.hello');
modale.classList.remove("hidden");
image.src = 'profile.png';
container.appendChild(image);
setTimeout(unShowModal,1000);


function unShowModal(){
    modale.style.display="none";
}