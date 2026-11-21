# 07 - PREGLED PROJEKTA

Pregled projekta je bil opravljen na dokumentaciji projekta, predvsem uporabniške zgodbe in funkcionalnosti.

Zapisanih je 15 uporabniških zgodb, od katerih je 7 označenih kot MVP (US1-US3 in US5-US8). V nadaljevanju smo se osredotočili na pet zgodb.

## Implementirane funkcionalnosti MVP

### Registracija in prijava
- registracija zahteva ime, e-pošto, geslo in lokacijo
- preveri se podvojena e-pošta, geslo se zgosti z bcrypt, prijava pa vrne JWT
- blokirani uporabniki so zavrnjeni pri prijavi in preverjanju obstoječega žetona

### Profil rastlin
- uporabnik lahko ustvari, pregleda, ureja in briše svoje rastline
- uredi lahko ime, vrsto, pogostost zalivanja, količino vode in svetlobe ter opombe in fotografije
- dostop do tuje rastline je zavrnjen
- rastlin v aktivni prošnji ni mogoče zbrisati

### Ustvarjanje prošnje
- lastnik izbere obdobje, lokacijo, opombo in najmanj eno rastlino
- nova prošnja dobi začetni status OPEN
- backend zavrne napačen vrstni red datumov in rastline drugega uporabnika

### Prijave in izbira varuha
- varuh lahko odda prijavo s spročilom na odprto prošnjo drugega uporabnika in umakne čakajočo prijavo
- lastnik vidi svoje prijavitelje in njihove ocene zaupanja
- sprejem, zavrnitev ostalih prijav, prehod prošnje v ACTIVE in izdelava urnika potekajo v transakciji

### Urnik in opravila
- po sprejetju varuha, backend za vsako rastlino ustvari opravila od začetnega do končnega datuma po njeni pogostosti zalivanja
- varuh vidi opravila v skupinah 'Zamujeno', 'Danes', 'Prihajajoče' in 'Opravljeno'
- prihodnjega opravila ni mogoče zaključiti
- lastnik in varuh lahko preglejujeta urnik

## Ustreznost MVP

### US-01: Registracija in prijava

*Izpolnjena?* **DELNO**

*Ugotovitve*:
- registracija in prijava sta implementirani v *backend/src/routes/auth.routes.js* in *backend/src/services/auth.service.js*
- obstajata tudi ustrezna obrazca v *frontend/src/views/RegisterView.vue* in *LoginView.vue*
- obvezna polja, enolični e-poštni naslov, bcrypt, JWT in zavrnitev blokiranega uporabnika so podprti 
- model uporabnika je namenjen navadnemu uporabniku
- administrativni vmesnik oziroma postopek za blokiranje uporabnikov ni implementiran

### US-02: Profili rastlin

*Izpolnjena?* **IZPOLNJENO**

*Ugotovitve*:
- *frontend/src/views/PlantsView.vue*,   *PlantForm.vue*   ter poti in storitev *backend/src/routes/plants.routes.js*   in *plant.service.js*   omogočajo seznam, dodajanje, urejanje in brisanje lastnih rastlin
- validacija zahteva ime in pozitivno celoštevilsko pogostost; podatki vključujejo fotografijo in dodatna navodila
- storitev omejuje dostop na lastnika.

### US-03: Ustvarjanje prošnje za varstvo

*Izpolnjena?* **IZPOLNJENO**

*Ugotovitve*:
- obrazec *frontend/src/views/NewRequestView.vue* in **backend/src/services/request.service.js* pokrivata datume, lokacijo in izbor rastlin
- backend zahteva vsaj eno rastlino, preveri lastništvo, preteklost začetnega datuma in vrstni red datumov ter ustvari prošnjo **OPEN**

### US-04: Brskanje in filtriranje odprtih prošenj

*Izpolnjena?* **DELNO**

*Ugotovitve*:
- odprte prošnje drugih uporabnikov so prikazane v *frontend/src/views/OpenRequestsView.vue*; *request.service.js* omeji seznam na status **OPEN** in izloči lastne prošnje
- prikaz vključuje lokacijo, datume in število rastlin
- iskalna oziroma filtrirna polja za lokacijo in datume niso v uporabniškem vmesniku, API pa filtrov ne obravnava, zato zgodbe ni mogoče šteti za v celoti izpolnjeno

### US-05: Prijava na prošnjo

*Izpolnjena?* **IZPOLNJENO**

*Ugotovitve*:
- Podrobnosti prošnje omogočajo prijavo s sporočilom in umik prijave v stanju **PENDING** (*RequestDetailView.vue*)
- backend v *application.service.js* zavrne prijavo na lastno ali neodprto prošnjo ter podvojeno aktivno prijavo
- umaknjeno prijavo je mogoče ponovno oddati; to je dodatno vedenje, ki ga kriteriji ne prepovedujejo

## Ostali MVP-ji
- US-06, US-07 in US-08 ustrezajo preostalim funkcionalnostim, označenim kot MVP. Izbira varuha, transakcijska izdelava urnika ter nadzorna plošča in zaključevanje opravil imajo ustrezno implementacijo v backendu in frontendu. - ocena zaupanja je pri prijavah izračunana iz ocen in števila zaključenih varstev.

- funkcije za zaključek varstva in ocenjevanje (US-11), administracijo, moderiranje ocen ter statistiko (US-14 in US-15) v pregledanih poteh in zaslonih niso prisotne
- tudi celovit pregled napredka za lastnika kot povzetek (US-10), preklic prošnje (US-13) in profil varuha (del US-12) niso razvidni kot zaključene funkcije. Status zamujenega opravila je sicer izračunan in prikazan, kar pokriva osrednji del US-09, vendar sama US-09 ni na seznamu MVP
- te funkcije zato niso vključene v zgornjo oceno MVP.