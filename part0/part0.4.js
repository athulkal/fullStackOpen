/*

The sequence diagram for the traditional page app on creating a new note


Sequence Diagram
participant browser
participant server


Browser ->>Server: POST  https://studies.cs.helsinki.fi/exampleapp/notes
Activate server 
Browser ->> Server: GET https://studies.cs.helsinki.fi/exampleapp/notes
Activating server
Server ->> Browser:  HTML document
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
Activate server
server-->>browser: the css file
Deactivate server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
activate server
server-->>browser: the JavaScript file
deactivate server

Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/ data.json
Activate server
server-->>browser: [{ "content": “Testing”, "date": "2023-1-1" }, ... ]
Deactivate server

Note right of browser: The browser executes the callback function that renders the notes

*/
