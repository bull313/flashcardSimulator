describe("Acceptance Tests", () => {
    let game
    let deck = new Deck("testgame", [
        new FlashCard("What is 10 + 10?", "20"),
        new FlashCard("What is the sound of one hand clapping", "Yes?"),
        new FlashCard("But why?", "WHWAH?")
    ])

    describe("Load a Game", () => {
        const GAMEPATH = "test/testgame"

        before(async () => {
            game = new Game()
            await game.load(GAMEPATH)
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

    describe("Play a Game", () => {

        before(async () => {
            game = new Game()
            game.deck = deck
            game.state = "ready"

            game.play()
        })

        it("should have a question available when moved to question state", () => {
            expect(game.currentCard.question).to.deep.equal("What is 10 + 10?")
        })

        describe("Answer Correctly", () => {
    
            it("should provide positive feedback when answer submitted is correct", () => {
                game.answer("20")
                expect(game.answeredCorrect).to.deep.equal(true)
                
            })
    
            it("should increment current score", () => {
                expect(game.score.current).to.deep.equal(1)
            })
    
            it("should increment the best possible score", () => {
                expect(game.score.best).to.deep.equal(1)
            })
        })
    })
})
