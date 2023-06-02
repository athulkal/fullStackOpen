/*

creating a new note on SPA version of the app

sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    deactivating server
    
    Note right of browser: The browser uses the javascript code to render the updated notes.



*/
