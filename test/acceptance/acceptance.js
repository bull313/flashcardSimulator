describe("Acceptance Tests", () => {
    describe("Load a Game", () => {
        const GAMEPATH = "test/testgame"
        let game

        before(async () => {
            game = new Game()
            await game.load(GAMEPATH)
        })

        it("should have a state of ready", () => {
            expect(game.state.toString()).to.deep.equal("ready")
        })

        it("should have 5 flashcards loaded", () => {
            expect(game.deck.cards.length).to.deep.equal(5)
        })

        it("should have a particular question", () => {
            expect(game.deck.cards[2].question).to.deep.equal("What… is your favourite colour?")
        })

        it("should have a particular answer", () => {
            expect(game.deck.cards[2].answer).to.deep.equal("Blue.")
        })
    })
})
