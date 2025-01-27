## Tehtävä 0.6 Uusi muistiinpano SPA


```mermaid
sequenceDiagram
    participant Käyttäjä
    participant Selain
    participant Palvelin

    %% Käyttäjä syöttää tekstin ja painaa "Tallenna"-painiketta
    Käyttäjä ->> Selain: Syöttää muistiinpanon ja painaa "Tallenna"
    Selain ->> Selain: JavaScript estää lomakkeen oletustoiminnan (e.preventDefault)
    Selain ->> Selain: Luo uusi muistiinpano (JSON-muotoinen objekti)
    Selain ->> Selain: Lisää muistiinpano selaimen listalle ja päivittää näkymän (redrawNotes)
    
    %% Selain lähettää muistiinpanon palvelimelle
    Selain ->> Palvelin: HTTP POST /new_note_spa (JSON-data: content & date)
    note right of Selain: Content-Type: application/json
    Palvelin -->> Selain: 201 Created (Muistiinpano tallennettu)

    %% Selain pysyy samalla sivulla, eikä uusia pyyntöjä tehdä
    Selain ->> Käyttäjä: Päivitetty muistiinpanolista näkyy ruudulla