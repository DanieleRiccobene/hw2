function onDelete(json){
    if(json.delete){
        const content = document.querySelector("#content");
        content.innerHTML = '';
        fetch("/queryFlight").then(onResponse).then(onJson);
    }else{
        console.log("Flight not deleted");
    }
}

function onResponse(response){
    return response.json();
}

function deleteFlight(event){
    const info = document.querySelector("#"+CSS.escape(event.currentTarget.id));
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    var prenotazione = info.querySelector(".hidden").id;
    var data = {
        idPrenotazione: prenotazione
    };
    
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type": "application/json",
            "X-CSRF-TOKEN" : token
        }
    };
        
    fetch("/deleteFlight",options).then(onResponse).then(onDelete);
}

function onJson(json){
    const divContent = document.querySelector("#content");


    if(json.length===0){
        const p = document.createElement("p");
        p.textContent = "No flights purchased";
        p.setAttribute("id","noContent");
        divContent.appendChild(p);
    }
    fetch("/checkDateFlight").then(onResponse).then(onShowDate);
    numEl = json.length;
    for(var i=0;i<json.length;i++){
        const mainDiv = document.createElement("div");
        const headerDiv = document.createElement("div");
        const bodyDiv = document.createElement("div");
        bodyDiv.setAttribute("id",i);
        const footerDiv = document.createElement("div");
        footerDiv.setAttribute("id",i);
        const delDiv = document.createElement("div");
        const cancel = document.createElement("p");
        const idPrenotazione = document.createElement("p");
        idPrenotazione.classList.add("hidden");
        idPrenotazione.setAttribute("id",json[i].prenotazione);
        bodyDiv.appendChild(idPrenotazione);

        const title = document.createElement("h3");
        title.textContent = "Flight Ticket";
        headerDiv.appendChild(title);

        const departure = document.createElement("p");
        var label = document.createElement("strong");
        label.textContent = "Departure:";
        departure.setAttribute("id","partenza");
        departure.textContent = label.textContent+json[i].partenza;
        bodyDiv.appendChild(departure);

        const destination = document.createElement("p");
        destination.setAttribute("id","destinazione");
        label.textContent = "Destination:";
        destination.textContent = label.textContent + json[i].destinazione;
        bodyDiv.appendChild(destination);

        const dataPartenza = document.createElement("p");
        dataPartenza.setAttribute("id","dataPartenza");
        label.textContent = "Departure date:";
        dataPartenza.textContent = label.textContent + json[i].dataPartenza;
        bodyDiv.appendChild(dataPartenza);

        const dataRitorno = document.createElement("p");
        dataRitorno.setAttribute("id","dataRitorno");
        label.textContent = "Return date:";
        dataRitorno.textContent = label.textContent + json[i].dataRitorno;
        bodyDiv.appendChild(dataRitorno);

        const passeggeri = document.createElement("p");
        passeggeri.setAttribute("id","passeggeri");
        label.textContent = "Passengers:";
        passeggeri.textContent = label.textContent + ' ' + json[i].passeggeri;
        bodyDiv.appendChild(passeggeri);

        const classe = document.createElement("p");
        classe.setAttribute("id","classe");
        label.textContent = "Class travel:";
        classe.textContent = label.textContent + json[i].classe;
        bodyDiv.appendChild(classe);

        const prezzo = document.createElement("p");
        prezzo.setAttribute("id","prezzo");
        prezzo.textContent = "€" + json[i].prezzo;
        cancel.textContent = "Cancel";
        footerDiv.appendChild(prezzo);
        footerDiv.appendChild(delDiv);

        delDiv.setAttribute("id",i);
        delDiv.addEventListener("click",deleteFlight);

        delDiv.classList.add("delete");
        mainDiv.classList.add("ticket");
        headerDiv.classList.add("ticket-header");
        bodyDiv.classList.add("ticket-body");
        footerDiv.classList.add("ticket-footer");
        cancel.classList.add("cancel");

        mainDiv.appendChild(headerDiv);
        mainDiv.appendChild(bodyDiv);
        mainDiv.appendChild(footerDiv);

        delDiv.appendChild(cancel);
        
        divContent.appendChild(mainDiv);
    }
}

function onShowDate(json){
    for(var i=0;i<json.length;i++){
        for(var j=0;j<numEl;j++){
            const ticket = document.querySelector("#"+CSS.escape(j));
            var date = ticket.querySelector("#dataPartenza").innerHTML;
            var dateValue ="";
            date = date.split("date:");
            dateValue = date[1];
            if(dateValue===json[i].dataPartenza){
                const button = document.querySelector(".delete#"+CSS.escape(j));
                button.style.display = "none";
            }
        }
        
    }
}

function onResponse(response){
    return response.json();
}
var numEl = 0;
fetch("/queryFlight").then(onResponse).then(onJson);
