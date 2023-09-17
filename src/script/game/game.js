class Game {
    constructor(deckLoader) {
        this.state = new AwaitGame()
        this.deckLoader = deckLoader
            || new FileDeckLoader(new CSVFileLoader(), new CSVDeckGenerator())
        this.deck = null
        this.incorrectPile = new Deck("", [])
        this.currentCard = null
        this.message = null
        this.questionCorrect = null
    }

    async load(deckName) {
        this.state = await this.state.update(this, deckName)
    }

    isDeckEmpty() {
        return this.deck.cards.length <= 0
    }

    isIncorrectPileEmpty() {
        return this.incorrectPile.cards.length <= 0
    }

    play() {
        this.state = this.state.update(this)
    }

    flip() {
        this.state = this.state.update(this)
    }

    correct() {
        this.questionCorrect = true
        this.state = this.state.update(this)
    }

    next() {
        this.state = this.state.update(this)
    }

    incorrect() {
        this.questionCorrect = false
        this.state = this.state.update(this)
    }

    loadIncorrectCards() {
        this.state = this.state.update(this)
    }
}
