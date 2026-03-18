# TMC-cyclus

De **TMC-cyclus** is een iteratieve werkwijze om een idee of onderdeel van een softwareproject stapsgewijs te verbeteren. In deze cyclus doorloop je steeds vier fasen:

## 1. Toetsen
Je test of controleert of het gekozen idee/ontwerp aansluit bij het doel en de eisen.

Voorbeelden (projectcontext):
- een feature bespreken met de opdrachtgever/docent
- gebruikers of teamleden laten proeflopen met een (deel)prototype
- controleren of de functionaliteit klopt met de acceptance criteria

## 2. Meten
Je verzamelt meetbare informatie over hoe het onderdeel presteert.

Voorbeelden:
- feedback van gebruikers (bijv. in een korte vragenronde)
- aantallen acties/doorlooptijd (indien je analytics/logs gebruikt)
- resultaten van tests (bijv. aantal geslaagde tests of gevonden bugs)

## 3. Controleren
Je vergelijkt de meetresultaten met de doelen/verwachtingen.

Wat je doet:
- beoordelen of de resultaten voldoen aan de gestelde criteria
- analyseren waarom resultaten wel/niet goed zijn
- bepalen welke verbeterpunten direct impact hebben

### Guerrillatests met klasgenoten (voorbeeld uit sprint)
Om snel signalen te krijgen hebben we guerrillatests uitgevoerd met klasgenoten: we lieten hen gericht taken uitvoeren op de demo/omgeving en noteerden wat direct duidelijk was en waar ze vastliepen.

We deden ongeveer deze testgevallen:
1. Home/landing: via navigatie (desktop) naar `Home` → terug naar `Tools` → terug naar `Help`. Feedback: nav voelt logisch. Kritiek: actieve pagina-indicatie is niet altijd meteen duidelijk bij snelle klikken.
2. Mobile menu (hamburger): scherm verkleinen, hamburger openen/sluiten, daarna een link selecteren naar `Tools` en `Journey`. Feedback: menu opent/sluit soepel. Kritiek: focus/keyboard-ervaring (tabben) was niet optimaal; knoppen waren soms lastig te volgen.
3. Tools-overzicht: in `Tools` zoeken op een deelwoord (bv. “rooster” of “eduroam”). Feedback: zoeken werkt snel. Kritiek: er is geen duidelijke hint wanneer je zoekterm “bijna” overeenkomt; “0 results” voelt wat abrupt.
4. Tools-overzicht filters: filterpillen selecteren (categorie + verplicht). Feedback: filtering helpt om de juiste tool te vinden. Kritiek: niet alle combinaties voelen voorspelbaar (welke pill is nu actief en wat gebeurt er bij wisselen van volgorde?).
5. Tools detailpagina: tool openen via `Tools` en snel scannen op secties (“Wat is dit?”, “Wanneer gebruik je het?”, stappen/tips). Feedback: informatie is gestructureerd. Kritiek: sommige secties zijn erg dicht op elkaar; visueel zou meer witruimte helpen.
6. Tool related tools: in de detailpagina “Gerelateerde tools” openen en teruggaan naar de vorige tool. Feedback: back-navigatie voelt ok. Kritiek: de scrollpositie/volgorde bij terugkomst was niet consistent (kleine UX-storing).
7. Journey pagina: checklist-items aanvinken en voortgang controleren (inclusief milestone/markers). Feedback: voortgang motiveert. Kritiek: de status/labels bij milestones zijn niet voor iedereen direct begrijpelijk; uitleg zou kort onder de kaart kunnen.
8. Journey UX: inchecken op verschillende viewport-groottes (minimaal 2 schermbreedtes) en controleren dat de voortgangsbalk en grid niet “breekt”. Feedback: layout is grotendeels stabiel. Kritiek: op kleinere schermen overlap/spacing rond de kaartkop kwam soms krap over.
9. Helppagina: 5 categorieën openen/sluiten, testen op mobiel smal, en controleren op aanwezigheid van stappen. Feedback: categorieën helpen gericht zoeken. Kritiek: icon/tekstverhouding is niet overal even goed leesbaar; bij smalle breedte kan titel sneller afbreken.
10. Feedbacksectie op tool detail: Ja → Nee → terug Ja, daarna refreshen. Feedback: student kan mening aanpassen en ziet direct effect. Kritiek: “Bedankt!” zou mogelijk iets korter/duidelijker kunnen (nu prima, maar visueel zou het minder dominant mogen).

## 4. Verbeteren (iteratie)
Op basis van de controlefase pas je het ontwerp of de implementatie aan.

Voorbeelden:
- UI/flow aanpassen op basis van usability-feedback
- bugs fixen en regressietesten uitvoeren
- de backlog prioriteren met de belangrijkste inzichten uit de metingen

## Waarom dit werkt
Door de cyclus te herhalen krijg je sneller duidelijkheid over wat werkt, wat niet werkt en wat de volgende beste stap is. Zo verbeter je je product gecontroleerd, in plaats van “in één keer” af te ronden.

