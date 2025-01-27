## Tehtävä 0.4 Uusi muistiinpano


```mermaid
sequenceDiagram
    %% Käyttäjä syöttää tekstin ja painaa "Tallenna"-painiketta
    participant Käyttäjä
    participant Selain
    participant Palvelin

    Käyttäjä ->> Selain: Syötä teksti ja paina "Tallenna"
    Selain ->> Palvelin: HTTP POST /exampleapp/notes
    Palvelin -->> Selain: 302 Uudelleenohjaus (Location: /exampleapp/notes)
    Selain ->> Palvelin: HTTP GET /exampleapp/notes
    Palvelin -->> Selain: 200 OK (Muistiinpanosivu)

    %% Selain lataa muistiinpanosivun resurssit
    Selain ->> Palvelin: HTTP GET /main.css
    Palvelin -->> Selain: 200 OK (CSS-tiedosto)
    Selain ->> Palvelin: HTTP GET /main.js
    Palvelin -->> Selain: 200 OK (JS-tiedosto)
    Selain ->> Palvelin: HTTP GET /data.json
    Palvelin -->> Selain: 200 OK (JSON-data)

    %% Selain renderöi muistiinpanosivun käyttäjälle
    Selain ->> Käyttäjä: Näyttää muistiinpanosivun