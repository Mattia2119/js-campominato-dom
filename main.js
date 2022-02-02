document.getElementById("play").addEventListener("click", play);

//Funzione per gestire il click sul button//
function play () {

    const difficoltà = document.getElementById("difficoltà").value;

    let numeroCelle;
    let quadratiPerRiga;
    const tentativi = [];
        
       if (difficoltà == "easy") {
        numeroCelle = 100;
        quadratiPerRiga = 10;
        } else if (difficoltà =="hard") {
            numeroCelle = 81;
            quadratiPerRiga = 9;
        } else if (difficoltà == "impossible") {
            numeroCelle= 49;
            quadratiPerRiga = 7;
        }
    
        const numeroBombe = 16;

        const bombe = generaBombe(numeroBombe,numeroCelle);
        console.log(bombe)

        /*Funzione per gestire il click sulle celle 
che mi aggiunga la classe blue e rimuova l'evento di click dopo il click */

        function cellClick () {
            this.classList.add("blue");
            this.removeEventListener("click", cellClick);
        
            const cell = parseInt(this.innerText);
        
            if (bombe.includes(cell)) {
                alert("Boom, hai perso...");
            } else { 
                tentativi.push(cell);
            }
            console.log("Al momento hai cliccato su una bomba")
        }


    //Effettuo il reset della griglia al click
    
    const grid = document.getElementById("grid");

    grid.innerHTML=""; 

    for (let i = 1; i <= numeroCelle; i++) {
        const nodo = document.createElement("div");

        if (numeroCelle == 100) {
            nodo.classList.add("quadrato");

        } else if (numeroCelle== 81) {
            nodo.classList.add("quadrato-medio");
            
        } else if (numeroCelle == 49) {
            nodo.classList.add("quadrato-grande");
        }

        nodo.innerText = i;

        nodo.addEventListener("click", cellClick);
        
        grid.appendChild(nodo); 
    }

    return true;
}
 
//Funzione per generare le bombe ed evitare che l'array si componga di doppioni
function generaBombe (numeroBombe, numeroCelle) {
    
    const bombeGenerate = [];

    while (bombeGenerate.length < numeroBombe) {

        const bomba = randomIntFromInterval(1 , numeroCelle);

        if (!bombeGenerate.includes(bomba)) {
            bombeGenerate.push(bomba);
        }
       
    }
    return bombeGenerate;
}

//UTILITIES

//Funzione per generare un numero casuale compreso tra due valori
function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
