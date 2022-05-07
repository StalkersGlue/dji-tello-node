import {TelloClient} from "./client/telloClient";

export async function changeme(client: TelloClient) {

}

//Test je code altijd eerst op de testClient

//Intro: Laat het programma je naam uitprinten met console.log()

//Opdracht 1: Battery Check, voordat we gaan vliegen moet de batterij meer dan 50% geladen zijn (if else)

//Opdracht 2: Testvlucht, laat de drone opstijgen en weer landen (await)

//Opdracht 3: Herhaalvlucht, laat de drone opstijgen, een kwartslag draaien en weer landen.
//Doe dit 4 keer achter elkaar zonder het programma opnieuw op te starten

//Opdracht 4: Goed mikken, laat de drone opstijgen vanaf een kussen. Vlieg 1 meter naar voren, vlieg 1 meter naar achteren
// en laat de drone vervolgens landen op het kussen (zonder reverse)

//Opdracht 5: Herhaal opdracht 4, maar maak nu gebruik van Command.reverse() en herhaal de actie 2 keer

//Opdracht 6: Cheese, we gaan de camera gebruiken. Geef de drone instructie om de camera aan te zetten en kijk mee op het scherm.
//Laat de drone naar het einde van de ruimte vliegen (waar het belhokje is), gebruik de drone om te om de hoek te kijken en keer terug

//Opdracht 7: Programmeurs automatiseren alles, Doe hetzelfde als in opave 6, maar in plaats van live mee te kijken, maak een foto en sla deze op

//Opdracht 8: Doe hetzelfde als in opgave 6, maar laat de drone 20 seconden in de lucht stil hangen om te kijken of er een gezicht te herkennen is om de hoek.
//Als de kans op een gezicht boven de 90% is, maak een backflip. Sla ook de foto van het gezicht op en rapporteer aan het einde van de vlucht de kans op een gezicht.