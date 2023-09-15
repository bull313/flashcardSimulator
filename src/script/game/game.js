class Game {
    constructor(deckLoader) {
        this.state = new AwaitGame()
        this.deckLoader = deckLoader
            || new FileDeckLoader(new CSVFileLoader(), new CSVDeckGenerator())
        this.deck = null
        this.currentCard = null
        this.message = null
        this.questionCorrect = null
        this.score = new Score()
    }

    async load(deckName) {
        this.state = await this.state.update(this, deckName)
    }

    isGameOver() {
        return this.deck.cards.length <= 0
    }

    play() {
        this.state = this.state.update(this)
    }

    flip() {
        this.questionCorrect = null
        this.state = this.state.update(this)
    }

    correct() {
        this.questionCorrect = true
        this.state = this.state.update(this)
    }

    incorrect() {
        this.questionCorrect = false
        this.state = this.state.update(this)
    }

    updateScore() {
        this.state = this.state.update(this)
        this.questionCorrect = null
    }
}
