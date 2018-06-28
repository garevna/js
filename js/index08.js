var fileName = 'js/testSHA.js'
document.querySelector ( 'input' ).value = 'js/testSHA.js'

var script = document.createElement ( 'script' )
script.src = "https://cdn.rawgit.com/chrisveness/crypto/4e93a4d/sha256.js"

script.onload = event => shaButton.disabled = false
script.onerror = event => 
            console.error ( "Ошибка загрузки скрипта " + script.src )

document.head.appendChild ( script )

var hash = document.createElement ( 'p' )
document.body.appendChild ( hash )
hash.innerHTML = "You should input file name"

var shaButton = document.createElement ( 'button' )
document.body.appendChild ( shaButton )
shaButton.innerHTML = "SHA256 hash for file content"
shaButton.disabled = true
shaButton.onclick = event => {
    fileName = document.querySelector ( 'input' ).value || 'js/testSHA.js'
    document.querySelector ( 'input' ).value = fileName
    fetch ( fileName, {
         integrity: "sha256-3kaVTBJ5ZWilzsSSQEL2JG2d1TFi4xgiO7yrsD3VrZk=",
         crossorigin: "anonymous"
    } )
    .then ( responseObject => {
                responseObject.text().then ( response => {
                        hash.innerHTML = Sha256.hash ( response )
                        loadButton.disabled = false
                        document.querySelector ( 'input' ).disabled = true
                        shaButton.disabled = true
                })
    })
    .catch ( ( err ) => hash.innerHTML = "Error file " + fileName )
}

var loadButton = document.createElement ( 'button' )
document.body.appendChild ( loadButton )
loadButton.innerHTML = "load script file with integrity"
loadButton.disabled = true
loadButton.onclick = event => {
            var userScript = document.createElement ( 'script' )
            userScript.src = 'js/testSHA.js'
            userScript.integrity = "sha256-3kaVTBJ5ZWilzsSSQEL2JG2d1TFi4xgiO7yrsD3VrZk="
            userScript.onerror = () => console.log ( "Integrity test has failed" )
            document.head.appendChild ( userScript )
            loadButton.disabled = true
            shaButton.disabled = false
            document.querySelector ( 'input' ).disabled = false
}


