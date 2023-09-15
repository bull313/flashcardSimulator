var gameName

function readGameParam() {
    let params = window.location.search

    return (
        (params && params.startsWith("?g=")) ? params.substring(3) : ""
    ).replaceAll('+', ' ')
}

function getGameParam() {
    return (gameName) ? gameName : readGameParam()
}

function isGameDeclared() {
    return getGameParam() ? true : false
}
