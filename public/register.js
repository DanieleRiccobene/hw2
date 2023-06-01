
function onPrintError(json){
    //console.log(json);
    
    if(json.error){
      document.querySelector('.type span').textContent = '' + json.message;
    }else{
      document.querySelector('.type span').textContent = "";
    }
}

function onError(response)
{
    return response.json();
}

function checkUsername()
{   
  //console.log(JSON.stringify(username.value));
  var data = {
    user : username.value
  };
  
  const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch("/checkUsername",{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "X-CSRF-TOKEN" : token
        }
      }).then(onError).then(onPrintError);
}

function passwordValidator(event){
  const bar = document.querySelector("#bar");
  var indicator = document.querySelector("#alert");
  var point = 0;
  //controllo numeri
  var numbers=/[0-9]/;
  if(numbers.test(event.target.value)){
    point = point + 20;
  }
  //controllo minuscole
  var lowerCase=/[a-z]/;
  if(lowerCase.test(event.target.value)){
    point = point + 20;
  }
  //controllo maiuscole
  var upperCase=/[A-Z]/;
  if(upperCase.test(event.target.value)){
    point = point + 20;
  }
  //controllo simboli
  var special=/[$-/:-?{-~!"^_`\[\]]/;
  if(special.test(event.target.value)){
    point = point + 20;
  }
  // controllo lunghezza
  if(event.target.value.length >=8){
    point = point + 20;
  }
  

  // risultato
  bar.style.width = point + "%";
  // voto massimo 100
  if (point == 100) {
    bar.style.backgroundColor = "green";
    indicator.textContent = "Very strong";
  }
  if (point >60) {
    bar.style.backgroundColor = "green";
    indicator.textContent = "Strong";
  }
  if (point <=40) {
    bar.style.backgroundColor = "yellow";
    indicator.textContent = "Good";
  }
  //voto minimo 20
  if (point <=20) {
    bar.style.backgroundColor = "red";
    indicator.textContent = "Weak";
  }

  if(event.target.value.length == 0){
    point == 0;
    indicator.textContent = "";
  }

  
}

function checkFields(event){
  
  if(form.fname.value.length == 0 ||
    form.surname.value.length == 0 ||
    form.username.value.length == 0 ||
    form.password.value.length == 0){
    const fname = document.getElementById("name");
    const sname = document.getElementById("surname");
    const email = document.getElementById("email");
    const pwd = document.getElementById("pwd");

    if(form.fname.value.length == 0){
      fname.classList.remove("fields");
      fname.classList.add("notValid");
    }else{
      fname.classList.add("fields");
    }

    if(form.surname.value.length == 0){
      sname.classList.remove("fields");
      sname.classList.add("notValid");
    }else
    {
      sname.classList.add("fields");
    }

    if(form.username.value.length == 0){
      email.classList.remove("fields");
      email.classList.add("notValid");
    }else
    {
      email.classList.add("fields");
    } 
    if(form.password.value.length == 0){
      pwd.classList.remove("fields");
      pwd.classList.add("notValid");
    }else
    {
      pwd.classList.add("fields");
    }
  event.preventDefault();
 }
}


const username = document.querySelector("#email");
username.addEventListener("focusout",checkUsername);
var error;
var whiteSpaceOnPassword;
const divError = document.getElementsByClassName("errors");
const submit = document.querySelector("input[type=submit]");
submit.addEventListener("submit",checkFields);
const form = document.querySelector("form");
form.addEventListener("submit",checkFields);
form.password.addEventListener("keyup",passwordValidator);


