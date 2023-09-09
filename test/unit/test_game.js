var game

class DummyDeckLoader extends DeckLoader {
    loadDeck(deckName) {
        return new Deck(deckName, [
            new FlashCard("test question 1", "test answer 1"),
            new FlashCard("test question 2", "test answer 2")
        ])
    }
}

describe("Game Test", () => {
    beforeEach(() => {
        game = new Game(new DummyDeckLoader())
    })

    it("should be in await state initially", () => {
        expect(game.state.toString()).to.deep.equal("awaitgame")
    })

    it("should be in ready state when deck is loaded", async () => {
        await game.load("testgame")

        expect(game.state.toString()).to.deep.equal("ready")
    })

    it("should have an available deck when ready", async () => {
        await game.load("testgame")

        expect(game.deck.cards.length).to.deep.equal(2)
    })

    it("should be in play state when play is requested", async () => {
        await game.load("testgame")
        game.play()

        expect(game.state.toString()).to.deep.equal("play")
    })

    it("should have a question loaded when play is requested", async () => {
        await game.load("testgame")
        game.play()

        expect(game.message).to.deep.equal("test question 1")
    })

    it("should have one fewer card in the deck when asking a question", async () => {
        await game.load("testgame")
        game.play()

        expect(game.deck.cards.length).to.deep.equal(1)
    })

    it("should reveal correct answer on flip", async () => {
        await game.load("testgame")
        game.play()
        game.flip()

        expect(game.message).to.deep.equal("test answer 1")
    })

    it("should move to the correct state when matching answer is submitted", async () => {
        await game.load("testgame")
        game.play()
        game.correct()

        expect(game.state.toString()).to.deep.equal("correct")
    })

    it("should increment user score on correct answer", async () => {
        await game.load("testgame")
        game.play()
        game.correct()

        expect(game.score.current).to.deep.equal(1)
    })

    it("should increment best score on correct answer", async () => {
        await game.load("testgame")
        game.play()
        game.correct()

        expect(game.score.best).to.deep.equal(1)
    })

    it("should move to the incorrect state when wrong answer is submitted", async () => {
        await game.load("testgame")
        game.play()
        game.incorrect()

        expect(game.state.toString()).to.deep.equal("incorrect")
    })

    it("should not increment user score on incorrect answer", async () => {
        await game.load("testgame")
        game.play()
        game.incorrect()

        expect(game.score.current).to.deep.equal(0)
    })

    it("should increment best score on incorrect answer", async () => {
        await game.load("testgame")
        game.play()
        game.incorrect()

        expect(game.score.best).to.deep.equal(1)
    })
})
