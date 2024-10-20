// handleliste.js

// Funksjoner for handlelisten
function leggTilVare() {
    const varenavn = document.getElementById("varenavn").value;
    const mengde = parseInt(document.getElementById("mengde").value, 10);

    if (varenavn && !isNaN(mengde)) {
        db.collection("handlelister").add({
            varenavn: varenavn,
            mengde: mengde,
            kjopt: false
        })
        .then(() => {
            console.log("Vare lagt til i handlelisten!");
            document.getElementById("varenavn").value = '';
            document.getElementById("mengde").value = '';
            hentHandleliste();
        })
        .catch((error) => {
            console.error("Det oppstod en feil: ", error);
        });
    } else {
        console.error("Varenavn eller mengde er ugyldig");
    }
}

function hentHandleliste() {
    const itemsContainer = document.getElementById("items");
    itemsContainer.innerHTML = '';
    db.collection("handlelister").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.innerHTML = `
                <p>${data.varenavn} - ${data.mengde}</p>
                <button onclick="slettVare('${doc.id}')">Slett</button>
            `;
            itemsContainer.appendChild(itemDiv);
            console.log("handleliste.js er lastet inn");
        });
    }).catch((error) => {
        console.error("Feil ved henting av handlelisten: ", error);
    });
}

function slettVare(id) {
    db.collection("handlelister").doc(id).delete().then(() => {
        console.log("Vare slettet!");
        hentHandleliste();
    }).catch((error) => {
        console.error("Feil ved sletting av vare: ", error);
    });
}

// Vent på at DOM-en lastes inn og hent deretter handlelisten
document.addEventListener('DOMContentLoaded', function () {
    hentHandleliste();
    
});


function oppdaterStatus(oppgaveId) {
    const checkbox = document.getElementById(oppgaveId);
    const finished = checkbox.checked; // Sjekker om boksen er krysset av eller ikke

    // Oppdater Firestore-databasen
    db.collection("vaskeoppgaver").doc(oppgaveId).update({
        fullført: finished
    }).then(() => {
        console.log("Oppgavestatus oppdatert!");
    }).catch((error) => {
        console.error("Feil ved oppdatering av oppgavestatus: ", error);
    });
}

function hentVaskeoppgaver() {
    const taskContainer = document.querySelector('.task-container');
    taskContainer.innerHTML = '';

    db.collection("vaskeoppgaver").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task-info';

            // Lag en checkbox som er sjekket hvis oppgaven er fullført
            const checked = data.fullført ? 'checked' : '';

            taskDiv.innerHTML = `
                <input type="checkbox" id="${doc.id}" onclick="oppdaterStatus('${doc.id}')" ${checked}>
                <label for="${doc.id}">
                    <h2>Uke ${data.uke}</h2>
                    <p><strong>Kjøkken/Stue:</strong> ${data.kjøkkenStue}</p>
                    <p><strong>Bad:</strong> ${data.bad}</p>
                    <p><strong>Gang/Trapp:</strong> ${data.gangTrapp}</p>
                    <p><strong>Innkjøp OG kaste papp:</strong> ${data.innkjøp}</p>
                </label>
            `;
            taskContainer.appendChild(taskDiv);
        });
    }).catch((error) => {
        console.error("Feil ved henting av vaskeoppgaver: ", error);
    });
}

function leggTilOppgave() {
    db.collection("tasks").add({
        week: 40,
        kitchen: "Henrik",
        bathroom: "Marius",
        hallway: "Oskar",
        shopping: "Joachim",
        completed: false
    }).then(() => {
        console.log("Oppgave lagt til i Firestore!");
    }).catch((error) => {
        console.error("Det oppstod en feil ved oppretting av oppgave: ", error);
    });
}

