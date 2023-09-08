class Game {
    constructor(deckLoader) {
        this.state = new AwaitGame()
        this.deckLoader = deckLoader
            || new FileDeckLoader(new CSVFileLoader(), new CSVDeckGenerator())
        this.deck = null
        this.currentCard = null
        this.answeredCorrect = null
        this.score = new Score()
    }

    async load(deckName) {
        this.deck = await this.deckLoader.loadDeck(deckName)
        this.state = new Ready()
    }

    play() {
        this.updateState()
        this.state.next(this)
    }

    updateScore() {
        this.score = this.state.updateScore(this.score)
    }

    updateState() {
        this.state = (this.deck.cards.length > 0) ? new Play() : new GameOver()
    }

    answer(guess) {
        this.answeredCorrect = guess === this.currentCard.answer
        this.state = (this.answeredCorrect) ? new Correct() : new Incorrect()
        this.updateScore()
    }

    next() {
        this.updateState()
        this.state.next(this)
    }
}
