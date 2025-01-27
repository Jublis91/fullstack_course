## Tehtävä 0.6 Uusi muistiinpano SPA

```mermaid
sequenceDiagram
    participant Käyttäjä
    participant Selain
    participant Palvelin

    %% Käyttäjä syöttää tekstin ja painaa "Tallenna"-painiketta
    Käyttäjä ->> Selain: Syöttää muistiinpanon ja painaa "Tallenna"

    %% lisää muistiinpanon ilman sivun uudelleenlatausta
    Selain ->> Selain: Lisää uusi muistiinpano muistiinpanojen listaan

    %% POST -pyyntö, sisältää JSON muodossa muistiinpanon (content ja date)
    %% content-type application/json; charset=utf-8
    Selain ->> Palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    
    note right of Selain: Content kertoo että data on JSON-muodossa

    %% ilman headeria palvelin ei osaa käsitellä pyynnön mukana olevaa dataa
    Palvelin -->> Selain: 201 Created (Muistiinpano tallennettu)

    %% Muita pyyntöljä ei toteuteta, selain pysyy samallla sivulla.

    %% Selain päivittää näkymän käyttäjälle
    Selain ->> Käyttäjä: Näyttää päivitetyn muistiinpanolistan