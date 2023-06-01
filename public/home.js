function addBaggage(){
    window.location.href = "/addBaggage";
}

function onConfirmJson(){

    modal.style.display = "block";
    const content = document.querySelector("div.modal-content");
    modal.appendChild(content);
    const h1 = document.createElement("h1");
    h1.textContent = "Flight booked successfully";
    content.appendChild(h1);
    const container = document.createElement("div");
    content.appendChild(container);
    const linkAdd= document.createElement("div");
    linkAdd.classList.add("add");
    linkAdd.innerHTML = "Add baggage";
    const linkWithout= document.createElement("div");
    linkWithout.classList.add("without");
    linkWithout.innerHTML = "Without baggage";
    container.appendChild(linkWithout);
    container.appendChild(linkAdd);

    linkAdd.addEventListener("click",addBaggage);

    linkWithout.addEventListener("click",function (){
        console.log("chiudi");
        modal.style.display = "none";
        window.location.reload();
    });  
}

function prenotaVolo(event) {
    const infoTarget = document.querySelector("#"+CSS.escape(event.target.id));
    const prezzoTarget = document.querySelector(".flight-price#"+CSS.escape(event.target.id));
    var partenza = infoTarget.querySelector("#partenza").innerHTML;
    var destinazione = infoTarget.querySelector("#destinazione").innerHTML;
    var dataPartenza = infoTarget.querySelector("#dataPartenza").innerHTML;
    var dataRitorno = infoTarget.querySelector("#dataRitorno").innerHTML;
    var passeggeri = infoTarget.querySelector("#passeggeri").innerHTML;
    var classe = infoTarget.querySelector("#classe").innerHTML;
    var prezzo = prezzoTarget.querySelector("#prezzo").innerHTML;
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    partenza = partenza.split(":");
    partenza = partenza[1];
    destinazione = destinazione.split(":");
    destinazione = destinazione[1];
    dataPartenza = dataPartenza.split("Date:");
    dataPartenza = dataPartenza[1];
    dataPartenza = dataPartenza.replace('T',' ');
    dataRitorno = dataRitorno.split("Date:");
    dataRitorno = dataRitorno[1];
    dataRitorno = dataRitorno.replace('T',' ');
    classe = classe.split(":");
    classe = classe[1];

    var arrayPasseggeri = passeggeri.split(":");
    var numPasseggeri = parseInt(arrayPasseggeri[1]);
    var ar1 = prezzo.split(":");
    var ar2 = ar1[1];
    var ar3 = ar2.split("€");
    var ar4 = parseFloat(ar3[1]);
    
    const data = {
        partenzaValue: partenza,
        destinazioneValue: destinazione,
        dataPartenzaValue: dataPartenza,
        dataRitornoValue: dataRitorno,
        passeggeriValue: numPasseggeri,
        classeValue: classe,
        prezzoValue: ar4
    };

    elements = data;
    console.log(elements);
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN" : token
        }
    };
    
    fetch("/addFlight",options).then(onConfirmJson);
    
}

function closeMenu() {
    const menuSelector = document.querySelector("#menuSelector");
    menuSelector.style.display = "none";
    enable();
}

function enable(){
    window.onscroll = function() {};
}

function disable(){
    // To get the scroll position of current webpage
    TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    LeftScroll = window.pageXOffset || document.documentElement.scrollLeft,
    
    // if scroll happens, set it to the previous value
    window.onscroll = function() {
    window.scrollTo(LeftScroll, TopScroll);
    };
}

function openMenu() {
    const menuSelector = document.querySelector("#menuSelector");
    menuSelector.style.display = "flex";
    disable();
}


function autocompletePartenza(event) {
        canFunctionRun1 = true;
        getIataPart(event.target.value);
}

function autocompleteDestinazione(event) {
        canFunctionRun2 = true;
        getIataDest(event.target.value);
}

function onTokenJson(json) {
    console.log(json);
}

function onTokenResponse(response) {
    return response.json();
}

function onFlightJson(json) {
    var i=0;
    const flights = document.getElementById("flights");
    flights.innerHTML = '';
    console.log(json);
    datas = json.data;
    const noContent = document.querySelector("#no-content");

    if(datas.length===0){
        noContent.innerHTML = "Your search returned no results...";
    }
    else{
    for (data of datas){
        noContent.innerHTML = "";
        const flightResults = document.createElement("div");
        const flight = document.createElement("div");
        const flightInfo = document.createElement("div");
        flightInfo.setAttribute("id",i);
        const title = document.createElement("h3");
        const partenza = document.createElement("p");
        partenza.setAttribute("id", "partenza");
        const destinazione = document.createElement("p");
        destinazione.setAttribute("id", "destinazione");
        const dataPartenza = document.createElement("p");
        dataPartenza.setAttribute("id", "dataPartenza");
        const dataRitorno = document.createElement("p");
        dataRitorno.setAttribute("id", "dataRitorno");
        const passeggeri = document.createElement("p");
        passeggeri.setAttribute("id", "passeggeri");
        const classe = document.createElement("p");
        classe.setAttribute("id", "classe");
        const priceDiv = document.createElement("div");
        priceDiv.setAttribute("id",i);
        const priceText = document.createElement("h3");
        priceText.setAttribute("id", "prezzo");
        const button = document.createElement("input");
        const numPass = document.querySelector('select[name=numeroAdulti').value;

        button.setAttribute("type", "submit");
        button.setAttribute("value", "Select");
        button.setAttribute("id",i);
        i++;
        button.addEventListener("click", prenotaVolo);

        flightResults.classList.add("flight-results");
        flight.classList.add("flight-result");
        flightInfo.classList.add("flight-info");
        priceDiv.classList.add("flight-price");

        flights.appendChild(flightResults);
        flightResults.appendChild(flight);
        flight.appendChild(flightInfo);
        flight.appendChild(priceDiv);
        var n = data.itineraries[0].segments.length; 
        partenza.textContent = 'Departure:' + data.itineraries[0].segments[0].departure.iataCode;
        destinazione.textContent = 'Destination:' + data.itineraries[0].segments[n-1].arrival.iataCode;
        dataPartenza.textContent = 'Departure Date:' + data.itineraries[0].segments[0].departure.at;
        dataRitorno.textContent = 'Return Date:' + data.itineraries[1].segments[0].departure.at;
        priceText.textContent = "Price: €" + " " + data.price.total;
        title.textContent = data.travelerPricings[0].fareDetailsBySegment[0].brandedFare;
        passeggeri.textContent = "Passengers:" + numPass;
        classe.textContent = "Class:" + data.travelerPricings[0].fareDetailsBySegment[0].cabin;

        flightInfo.appendChild(title);
        flightInfo.appendChild(partenza);
        flightInfo.appendChild(destinazione);
        flightInfo.appendChild(dataPartenza);
        flightInfo.appendChild(dataRitorno);
        flightInfo.appendChild(passeggeri);
        flightInfo.appendChild(classe);

        priceDiv.appendChild(priceText);
        priceDiv.appendChild(button);
    }
    }
}

function onResponse(response) {
    return response.json();
}

function onResponseIata(response) {
    return response.json();
}

function selezionaAereoportoDest(event) {
    d.value = event.target.textContent;
    resultD.style.display ="none";
    canFunctionRun2 = false;

}

function selezionaAereoportoPart(event) {
    p.value = event.target.textContent;
    resultP.style.display = "none";
    canFunctionRun1 = false;
}

function onIataJsonPart(json) {
    console.log(json);
    if(canFunctionRun1){
    const container = document.querySelector('#resultPart');

    if(p.value===""){
        container.style.display = "none";
    }else{
        container.style.display = "block";
    }
    let aeroportiConsigliati = "";
    container.innerHTML = '';
    for (dati of json.data) {

        aeroportiConsigliati += `<li>${dati.iataCode}</li>`;
    }
    container.innerHTML = `<ul> ${aeroportiConsigliati} </ul>`;

    const choice = document.getElementsByTagName('li');
    for (c of choice) {
        c.addEventListener('click', selezionaAereoportoPart);
    }
}
}


function onIataJsonDest(json) {
    if(canFunctionRun2){
    const container = document.querySelector('#resultDest');

    if(d.value===""){
        container.style.display = "none";
    }else{
        container.style.display = "block";
    }
    
    let aeroportiConsigliati = "";
    container.innerHTML = '';


    for (dati of json.data) {
        aeroportiConsigliati += `<li>${dati.iataCode}</li>`;
    }
    container.innerHTML = `<ul> ${aeroportiConsigliati} </ul>`;

    const choice = document.getElementsByTagName('li');

    for (c of choice) {
        c.addEventListener('click', selezionaAereoportoDest);
    }
}
}

function getIataPart(city) {
    const data = {
        el: city
    };
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN" : token
        }
    };
    fetch("/obtainIata", options).then(onResponseIata).then(onIataJsonPart);
}

function getIataDest(city) {
    const data = {
        el: city
    };
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN" : token
        }
    };
    fetch("/obtainIata", options).then(onResponseIata).then(onIataJsonDest);
}


function search(event) {
    const partenza = document.querySelector('#formTextPartenza').value;
    const destinazione = document.querySelector('#formTextDestinazione').value;
    const dataPartenza = document.querySelector('input[name=dataPartenza]').value;
    const dataRitorno = document.querySelector('input[name=dataRitorno] ').value;
    const numAdulti = document.querySelector('select[name=numeroAdulti').value;
    const tipoVolo = document.querySelector('#formSel').value;
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const data = {
        originLocationCode: partenza,
        destinationLocationCode: destinazione,
        departureDate: dataPartenza,
        returnDate: dataRitorno,
        adults: numAdulti,
        travelClass: tipoVolo,
        max: 20
    };
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN" : token
        }
    };
    //Recupera il token per OAuth 2.0 e fa la richiesta dei voli
    fetch("/obtainFlights", options).then(onResponse).then(onFlightJson);
}
const modal = document.querySelector("div.modal");
const resultP = document.getElementById("resultPart");
const resultD = document.getElementById("resultDest");
var canFunctionRun1 = true;
var canFunctionRun2 = true;

/*PER DIFFERENZIARE GLI AEROPORTI SE UNA CITTA HA PIU DI UN AEROPORTO*/
const p = document.getElementById("formTextPartenza");
p.addEventListener("keyup", autocompletePartenza);
const d = document.getElementById("formTextDestinazione");
d.addEventListener("keyup", autocompleteDestinazione);
var elements = {};
const form = document.querySelector('form');
const cercaVoli = document.querySelector('div#searchFlight');
const menu = document.querySelector("#menu");
menu.addEventListener("click", openMenu);
const cross = document.querySelector("div#close span");
cross.addEventListener("click", closeMenu);
cercaVoli.addEventListener('click', search);