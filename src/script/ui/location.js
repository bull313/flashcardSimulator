const CURRENT_LOCATION = window.location.href
const QUERY_PARAM_CHAR = '?'

function queryParamStartIdx() {
    return CURRENT_LOCATION.indexOf(QUERY_PARAM_CHAR)
}

function getMainMenuURL() {
    return CURRENT_LOCATION.substring(0, queryParamStartIdx() - 1)
}

function returnToMainMenu() {
    window.location.href = getMainMenuURL()
    return false
}
