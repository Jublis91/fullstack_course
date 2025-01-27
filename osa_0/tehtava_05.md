## Tehtävä 0.5 Sivlle SPA siirtyminen

```mermaid
sequenceDiagram
    participant Käyttäjä
    participant Selain
    participant Palvelin

    %% Käyttäjä syöttää osoitteen selaimeen
    Käyttäjä ->> Selain: Avaa https://studies.cs.helsinki.fi/exampleapp/spa
    Selain ->> Palvelin: HTTP GET /exampleapp/spa
    Palvelin -->> Selain: 200 OK (HTML-sivu)

    %% Selain lataa tarvittavat resurssit
    Selain ->> Palvelin: HTTP GET /main.css
    Palvelin -->> Selain: 200 OK (CSS-tiedosto)
    Selain ->> Palvelin: HTTP GET /spa.js
    Palvelin -->> Selain: 200 OK (JavaScript-tiedosto)
    Selain ->> Palvelin: HTTP GET /data.json
    Palvelin -->> Selain: 200 OK (JSON-data)

    %% Selain renderöi SPA-sivun
    Selain ->> Käyttäjä: Renderöi Single Page App -muistiinpanosivun