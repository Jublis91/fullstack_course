## Tehtävä 0.4 Uusi muistiinpano

```mermaid
sequenceDiagram
    %% Käyttäjä syöttää tekstin ja painaa "Tallenna"-painiketta
    participant Käyttäjä
    participant Selain
    participant Palvelin

    Käyttäjä ->> Selain: Syötä teksti ja paina "Tallenna"

    %% content-type text/html; charset=utf-8
    Selain ->> Palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    %% form-tag atribuuttien action ja method
    %% POST -pyynnöstä huolehtii palvelimella oleva javascript koodi
    Palvelin -->> Selain: 302 Uudelleenohjaus (Location: /exampleapp/notes)

    %%content-type text/html; charset=utf-8
    Selain ->> Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    Palvelin -->> Selain: 200 OK (Muistiinpanosivu)

    %% Selain lataa muistiinpanosivun resurssit
    %% Haetaan tyyliteidosto, content-type text/css; charset=UTF-8
    Selain ->> Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Palvelin -->> Selain: 200 OK (CSS-tiedosto)


    %% Haetaan javascript tiedosto, content-type: application/javascript; charset=UTF-8
    Selain ->> Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Palvelin -->> Selain: 200 OK (JS-tiedosto)

    %% Haetaan data, content-type: application/json; charset=utf-8
    Selain ->> Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Palvelin -->> Selain: 200 OK (JSON-data)

    %% Selain päivittää koko muistiinpanosivun käyttäjälle
    Selain ->> Käyttäjä: Esittää päivitetyn muistiinpanosivun käyttäjälle