## Tehtävä 0.5 Sivlle SPA siirtyminen

```mermaid
sequenceDiagram
    participant Käyttäjä
    participant Selain
    participant Palvelin

    %% Käyttäjä syöttää osoitteen selaimeen
    Käyttäjä ->> Selain: Avaa https://studies.cs.helsinki.fi/exampleapp/spa
    Selain ->> Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
    %% content-type: text/html; charset=utf-8
    Palvelin -->> Selain: 200 OK (HTML-sivu)

    %% Selain lataa tarvittavat resurssit

    %% Haetaan tyylitiedosto, content-type: text/css; charset=UTF-8
    Selain ->> Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Palvelin -->> Selain: 200 OK (CSS-tiedosto)

    %% Haetaan javascript, content-type application/javascript; charset=UTF-8
    Selain ->> Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Palvelin -->> Selain: 200 OK (JavaScript-tiedosto)

    %% Haetaan data, content-type application/json; charset=utf-8
    Selain ->> Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Palvelin -->> Selain: 200 OK (JSON-data)

    %% Selain renderöi SPA-sivun
    Selain ->> Käyttäjä: Avaa Single Page App -muistiinpanosivun