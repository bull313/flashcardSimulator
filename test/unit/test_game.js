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

    describe("Game Await State Test", () => {
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
    })

    describe("Game Question State Test", () => {
        beforeEach(async () => {
            await game.load("testgame")
            game.play()
        })

        it("should be in question state when play is requested", () => {
            expect(game.state.toString()).to.deep.equal("question")
        })

        it("should have a question loaded when play is requested", () => {
            expect(game.message).to.deep.equal("test question 1")
        })

        it("should have one fewer card in the deck when asking a question", () => {
            expect(game.deck.cards.length).to.deep.equal(1)
        })
    })

    describe("Game Flip Card State Test", () => {
        beforeEach(async () => {
            await game.load("testgame")
            game.play()
            game.flip()
        })

        it("should reveal correct answer on flip", () => {
            expect(game.message).to.deep.equal("test answer 1")
        })

        it("should move to the answer state", () => {
            expect(game.state.toString()).to.deep.equal("answer")
        })
    })

    describe("Game Guess Test", () => {
        beforeEach(async () => {
            await game.load("testgame")
            game.play()
            game.flip()
        })

        describe("Game Guess Correctly Test", () => {
            beforeEach(() => {
                game.correct()
            })

            it("should move to the correct state when correct answer is given", () => {
                expect(game.state.toString()).to.deep.equal("correct")
            })
        })

        describe("Game Guess Incorrectly Test", () => {
            beforeEach(() => {
                game.incorrect()
            })

            it("should move to the incorrect state when incorrect answer is given", () => {
                expect(game.state.toString()).to.deep.equal("incorrect")
            })
        })
    })

    describe("Game Next Question Test", () => {
        beforeEach(async () => {
            await game.load("testgame")
            game.play()
            game.flip()
        })

        describe("Game Next Question - After Correct Guess Test", () => {
            beforeEach(() => {
                game.correct()
                game.updateScore()
            })

            it("should increment user score on correct answer", () => {    
                expect(game.score.current).to.deep.equal(1)
            })
    
            it("should increment best score on correct answer", () => {     
                expect(game.score.best).to.deep.equal(1)
            })
    
            it("should move back to the ready state", () => {
                expect(game.state.toString()).to.deep.equal("ready")
            })

            it("should move to the next question state on play", () => {
                game.play()

                expect(game.state.toString()).to.deep.equal("question")
            })
        })

        describe("Game Next Question - After Incorrect Guess Test", () => {
            beforeEach(() => {
                game.incorrect()
                game.updateScore()
            })

            it("should not increment user score on incorrect answer", () => {    
                expect(game.score.current).to.deep.equal(0)
            })
    
            it("should increment best score on incorrect answer", () => {     
                expect(game.score.best).to.deep.equal(1)
            })
    
            it("should move back to the ready state", () => {
                expect(game.state.toString()).to.deep.equal("ready")
            })

            it("should move to the next question state on play", () => {
                game.play()
                expect(game.state.toString()).to.deep.equal("question")
            })
        })
    })

    describe("Game Over Test", () => {
        beforeEach(async () => {
            await game.load("testgame")
            game.play()
            game.flip()
            game.correct()
            game.updateScore()
            game.play()
            game.flip()
            game.incorrect()
            game.updateScore()
            game.play()
        })

        it("should be on the game over state when questions have run out", () => {
            expect(game.state.toString()).to.deep.equal("gameover")
        })
    })
})
