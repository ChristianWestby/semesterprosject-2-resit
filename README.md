# semesterprosject-2-resit
# PET Adoption Shelter

Et frontend-prosjekt laget som del av FED2 ved Noroff. Applikasjonen lar brukere utforske kjæledyr og lar en admin-bruker logge inn for å opprette, redigere og slette kjæledyr via Noroff API v2.

## Live URL

Netlify:  
https://delicate-empanada-a9f173.netlify.app/

## Lenker

- Figma Designsystem og Prototype:  
  https://www.figma.com/proto/1rGHBOvEpPzNi7Iu0TWWqT/Semester-Exam---Pet-Adoption---Christian-Westby?page-id=0%3A1&node-id=4-91&p=f&viewport=535%2C-204%2C0.13&t=j4nwZ4joMAPDKWhe-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=4%3A91

- Gantt-diagram i Figma (samme som over)

- GitHub Projects (Kanban):  
  https://github.com/users/ChristianWestby/projects/7

## Teknologi brukt

- Vite
- Vanilla JavaScript
- Tailwind CSS v3.4.1
- Noroff API v2 – `https://v2.api.noroff.dev/pets`
- GitHub Projects som Kanban
- Figma til design og komponentbibliotek

## Admin-funksjoner

- Logg inn og registrer admin-bruker
- Opprett kjæledyr (POST)
- Rediger kjæledyr (PUT)
- Slett kjæledyr (DELETE)
- Admin-dashboard med oversikt

OBS – API-begrensning (`createdBy`):  
Noroff API v2 returnerer ikke `createdBy`-feltet i `GET /pets`. Det betyr at applikasjonen **ikke kan filtrere ut kun kjæledyr opprettet av innlogget bruker**.  
Denne funksjonaliteten ble forsøkt implementert, men er kommentert ut pga. manglende støtte i API-et.

## Designspråk og komponenter

Et komplett designsystem er satt opp i Figma med:

- Typografisk hierarki
- Fargepalett med bruksspesifikasjoner
- Komponenter: Navbar, Footer, Cards, Buttons, Input-felt
- Responsive mockups og style guide
- Animasjonselement på forsiden (poteavtrykk)
- Logo: “PET Adoption Shelter” med grønn bakgrunn og pote-ikon

## Modulstruktur

- Alle sider lastes inn dynamisk via `main.js` og `router.js`
- HTML-filene inneholder kun en `<div id="app">`
- Autentisering og API-kall håndteres via `auth.js` og `api.js`
- Koden er delt opp i moduler per side/rolle

## Viktig for sensor

Dette prosjektet er bygget modulært, hvor hovedinnholdet lastes inn dynamisk. Dette gir fleksibilitet og lar applikasjonen styres sentralt fra `router.js`.  
Formene er designet med svart ramme og følger det definerte designet i Figma.

## Sjekkliste

- [x] Bruker Noroff API v2
- [x] Admin kan gjøre CRUD-operasjoner
- [x] Fullt responsivt design
- [x] Designsystem dokumentert i Figma
- [x] Dynamisk navbar med innloggingsstatus
- [x] Tokenbeskyttede admin-sider
- [x] Netlify-deploy fra `main`-branch
- [x] README med alle lenker og forklaringer

## Studentinformasjon

- Student: Christian Westby  
- Innleveringsdato: 20. april 2025  
- Studieprogram: Frontend-utvikling, Noroff