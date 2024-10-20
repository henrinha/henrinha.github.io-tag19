// handleliste.js

// Funksjoner for handlelisten
function leggTilVare() {
    const varenavn = document.getElementById("varenavn").value;
    const mengde = parseInt(document.getElementById("mengde").value, 10);

    if (varenavn && !isNaN(mengde)) {
        db.collection("handlelister").add({
            varenavn: varenavn,
            mengde: mengde,
            kjøpt: false
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
