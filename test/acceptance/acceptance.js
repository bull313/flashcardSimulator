describe("Acceptance Tests", () => {
    var game

    describe("Load a Game", () => {
        const GAMEPATH = "test/testgame"

        beforeEach(async () => {
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

        beforeEach(async () => {
            game = new Game()
            game.state = new Ready()
            game.deck = new Deck("testgame", [
                new FlashCard("What is 10 + 10?", "20"),
                new FlashCard("What is the sound of one hand clapping", "Yes?"),
                new FlashCard("But why?", "WHWAH?")
            ])

            game.play()
        })

        it("should have a question available as the message", () => {
            expect(game.message).to.deep.equal("What is 10 + 10?")
        })

        describe("Answer Correctly", () => {

            beforeEach(async () => {
                game = new Game()
                game.state = new Ready()
                game.deck = new Deck("testgame", [
                    new FlashCard("What is 10 + 10?", "20"),
                    new FlashCard("What is the sound of one hand clapping", "Yes?"),
                    new FlashCard("But why?", "WHWAH?")
                ])
    
                game.play()
                game.flip()
                game.correct()
            })
    
            it("should increment current score", () => {
                expect(game.score.current).to.deep.equal(1)
            })
    
            it("should increment the best possible score", () => {
                expect(game.score.best).to.deep.equal(1)
            })

            it("should have the correct answer as the message", () => {
                expect(game.message).to.deep.equal("20")
            })
        })

        describe("Answer Incorrectly", () => {

            beforeEach(async () => {
                game = new Game()
                game.state = new Ready()
                game.deck = new Deck("testgame", [
                    new FlashCard("What is 10 + 10?", "20"),
                    new FlashCard("What is the sound of one hand clapping", "Yes?"),
                    new FlashCard("But why?", "WHWAH?")
                ])
    
                game.play()
                game.flip()
                game.incorrect()
            })
    
            it("should not increment current score", () => {
                expect(game.score.current).to.deep.equal(0)
            })
    
            it("should increment the best possible score", () => {
                expect(game.score.best).to.deep.equal(1)
            })

            it("should have the correct answer as the message", () => {
                expect(game.message).to.deep.equal("20")
            })
        })

        describe("Game Over", () => {

            beforeEach(async () => {
                game = new Game()
                game.state = new Ready()
                game.deck = new Deck("testgame", [
                    new FlashCard("What is 10 + 10?", "20"),
                    new FlashCard("What is the sound of one hand clapping", "Yes?"),
                    new FlashCard("But why?", "WHWAH?")
                ])
    
                game.play()
                game.incorrect()
                game.next()
                game.correct()
                game.next()
                game.incorrect()
            })
    
    
            it("should not be able to play again", () => {
                game.next()
                expect(game.currentCard).to.deep.equal(null)
            })
    
            it("should give a score of 1", () => {
                expect(game.score.current).to.deep.equal(1)
            })
    
            it("should give a best possible score of 3", () => {
                expect(game.score.best).to.deep.equal(3)
            })
        })
    })
})
