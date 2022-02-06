
/*Aggiungo un evento di click all'elemento con classe play,
 che mi faccia partire la funzione play*/

 document.getElementById("play").addEventListener("click", play);

 function play() {
 
     const numeroBombe = 16;
   
     //Rimuovo dopo il primo click, l'evento di click sul button//
     this.removeEventListener("click", play);
 
     //Creo la variabile che mi raccola il valore del button nell Html//
     let difficoltà = document.getElementById("difficoltà").value;
 
     /* Creo due variabili cui andrò ad inserire i dati di cui 
     avrò bisogno in seguito*/
     let numeroCelle;
     let quadratiPerRiga;
     const tentativi = [];
 
     /*Definisco le condizioni in base alle quali 
     generare i miei valori*/
     if (difficoltà == "easy") {
         numeroCelle = 100;
         quadratiPerRiga = 10;
     } 
     else if ( difficoltà == "hard") {
         numeroCelle = 81;
         quadratiPerRiga = 9;
     }
     else if (difficoltà == "impossible") {
         numeroCelle = 49;
         quadratiPerRiga = 7;
     }   
     
     //Mi richiamo l'elemento padre nell'Html//
     const grid = document.querySelector("#grid");
 
     //Creo il ciclo e la variabile con cui inserire gli elementi figlio//
     for (let i = 1; i <= numeroCelle; i++) {
 
        //Dichiaro la variabile di servizio degli elementi figlio per poterli inserire con la Create Element//
         const div = document.createElement("div");
 
        //Imposto le condizioni di assegnazione delle tre classi Css da applicare ai div//
         if (numeroCelle == 100) {
             div.classList.add("quadrato");
         } 
         else if ( numeroCelle == 81) {
             div.classList.add("quadrato-medio");
         }
         else if (numeroCelle == 49) {
             div.classList.add("quadrato-grande")
         }
         //Utilizzo la appendChild per iniettare i div nel dom(Nella griglia)//
         grid.appendChild(div);
 
         /*Utilizzo la proprietà .innerText = per inserire dentro i div
         il valore numerico di ogni cella*/
         div.innerText = i;
 
         div.addEventListener("click", ClickSullaCella);
     }   
     
     //Array di bombe//
     const bombe = BombsGenerator (numeroBombe, numeroCelle); 
     console.log(bombe);
     
 
     //Creo la funzione per generare le bombe, che dovrà accettare due valori//
     function BombsGenerator (NumeroDiBombe, NumeroDiCelle) {
     //Creo un array vuoto//
         const bombeGenerate = [];
         
         //Finché la lunghezza dell'array non raggiunge il numero delle bombe che mi servono
         while (bombeGenerate.length < numeroBombe) {
             /*Definisco una variabile bomba, che mi dovrà generare un numero casuale tra uno ed il 
             valore di numero numeroCelle, definisco la condizione per cui: Se bombeGenerate non include già
             lo stesso valore di bomba può accettarlo nell'array*/
             const bomba = getRndInteger(1,numeroCelle);
             if (!bombeGenerate.includes(bomba)) {
                 bombeGenerate.push(bomba);
             }
         }
         //Inserisco la return altrimenti non mi restituisce il valori dell'array
         return bombeGenerate;
     }
     //Creo la funzione che mi gestirà il cambio di colore sulle celle//
     function ClickSullaCella() {
         this.classList.add("blue");
         //Creo la costante per recuperare il numero della cella su cui faccio click//
         const cellClick = parseInt(this.innerText);
 
         if  (bombe.includes(cellClick)) {
               fineGioco()
               alert("Ops..hai preso una bomba, ricarica la pagina e ritenta")
         } else {
             tentativi.push(cellClick);
         }
     //Creo la funzione per gestire l'endgame//
         function fineGioco() {
             const quadrati = document.getElementsByClassName("quadrato")
             for (let i =0; i<quadrati.length; i++) {
                 if (bombe.includes(parseInt(quadrati[i].innerText))) {
                     quadrati[i].classList.add("bomb")
                 }
                 quadrati[i].removeEventListener("click", ClickSullaCella)           
             }
             const quadratiMedi = document.getElementsByClassName("quadrato-medio")
             for (let i =0; i<quadratiMedi.length; i++) {
                 if (bombe.includes(parseInt(quadratiMedi[i].innerText))) {
                     quadratiMedi[i].classList.add("bomb")
                 }
                 quadratiMedi[i].removeEventListener("click", ClickSullaCella)
             }
             const quadratiGrandi = document.getElementsByClassName("quadrato-grande")
             for (let i =0; i<quadratiGrandi.length; i++) {
                 if (bombe.includes(parseInt(quadratiGrandi[i].innerText))) {
                     quadratiGrandi[i].classList.add("bomb")
                 }
                 quadratiGrandi[i].removeEventListener("click", ClickSullaCella)
             }
         }
 
         //Rimuovo l'evento di click della cella, dopo il primo click//
         this.removeEventListener("click", ClickSullaCella);
     } 
 
     //Funzione per generare un numero casuale compreso tra due valori//
     function getRndInteger(min, max) {
         return Math.floor(Math.random() * (max - min)) + min;
     }
 
 
} 