function getLetterGrade(percentage) {
    if (percentage >= 97) return "A+"
    if (percentage >= 93) return "A"
    if (percentage >= 90) return "A-"

    if (percentage >= 87) return "B+"
    if (percentage >= 83) return "B"
    if (percentage >= 80) return "B-"

    if (percentage >= 77) return "C+"
    if (percentage >= 73) return "C"
    if (percentage >= 70) return "C-"

    if (percentage >= 67) return "D+"
    if (percentage >= 63) return "D"
    if (percentage >= 60) return "D-"
    
    else return "Big ol' jeFe"
}

function tabulateFinalScore() {
    return game.score.current / game.score.best * 100.0
}
