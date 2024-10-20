function leggTilVare() {
    const varenavn = document.getElementById("varenavn").value;
    const mengde = parseInt(document.getElementById("mengde").value, 10);
  
    db.collection("handlelister").add({
      varenavn: varenavn,
      mengde: mengde,
      kjøpt: false
    })
    .then(() => {
      console.log("Vare lagt til i handlelisten, pus!");
    })
    .catch((error) => {
      console.error("Det oppstod en feil, pus: ", error);
    });
  }
  
function opprettBruker(email, passord) {
    firebase.auth().createUserWithEmailAndPassword(email, passord)
        .then((userCredential) => {
            // Innlogget
            var user = userCredential.user;
            console.log("Bruker opprettet og innlogget:", user.email);
        })
        .catch((error) => {
            console.error("Feil ved oppretting eller innlogging:", error);
        });
}

function loggInn(email, passord) {
    firebase.auth().signInWithEmailAndPassword(email, passord)
        .then((userCredential) => {
            // Brukeren er innlogget
            var user = userCredential.user;
            console.log("Bruker innlogget:", user.email);
        })
        .catch((error) => {
            console.error("Innlogging feilet:", error);
        });
}
