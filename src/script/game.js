class Game {
    constructor(deckLoader) {
        this.state = new AwaitGame()
        this.deckLoader = deckLoader
            || new FileDeckLoader(new CSVFileLoader(), new CSVDeckGenerator())
        this.deck = null
        this.currentCard = null
        this.message = null
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

    flip() {
        this.message = this.currentCard.answer
    }

    correct() {
        this.state = new Correct()
        this.updateScore()
    }

    incorrect() {
        this.state = new Incorrect()
        this.updateScore()
    }

    next() {
        this.updateState()
        this.state.next(this)
    }
}
