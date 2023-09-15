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
        beforeEach(() => {
            game = new Game()
            game.state = new Ready()
            game.deck = new Deck("testgame", [
                new FlashCard("What is 10 + 10?", "20"),
                new FlashCard("What is the sound of one hand clapping", "Yes?"),
                new FlashCard("But why?", "WHWAH?"),
                new FlashCard("Who cares?", "Me")
            ])

            game.play()
        })

        it("should have a question available as the message", () => {
            expect(game.message).to.deep.equal("What is 10 + 10?")
        })

        describe("Flip the Card to Get the Answer", () => {
            beforeEach(() => {
                game.flip()
            })

            it("should show the correct answer", () => {
                expect(game.message).to.deep.equal("20")
            })
        })

        describe("Answer Correctly", () => {
            beforeEach(() => {
                game.flip()
                game.correct()
                game.next()
                game.play()
            })

            it("should not add the previous card to the incorrect pile", () => {
                expect(game.incorrectPile.cards.length).to.deep.equal(0)
            })
    
            it("should provide the next question", () => {
                expect(game.message).to.deep.equal("What is the sound of one hand clapping")
            })
        })

        describe("Answer Incorrectly", () => {
            beforeEach(() => {
                game.flip()
                game.incorrect()
                game.next()
                game.play()
            })
    
            it("should add the previous card to the incorrect pile", () => {
                expect(game.incorrectPile.cards[0].question).to.deep.equal("What is 10 + 10?")
                expect(game.incorrectPile.cards[0].answer).to.deep.equal("20")
            })

            it("should provide the next question", () => {
                expect(game.message).to.deep.equal("What is the sound of one hand clapping")
            })
        })

        describe("Rounds and Game Over Test", () => {
            describe("Round 1 Test", () => {
                beforeEach(() => {
                    game.flip()
                    game.correct()
                    game.next()
                    game.play()
    
                    game.flip()
                    game.incorrect()
                    game.next()
                    game.play()
    
                    game.flip()
                    game.correct()
                    game.next()
                    game.play()
                    
                    game.flip()
                    game.incorrect()
                    game.next()
                    game.play()
                })

                it("should not be able to play again", () => {
                    expect(game.message).to.deep.equal(null)
                })
    
                it("should start a new round with only the incorrect pile", () => {
                    game.loadIncorrectCards()
    
                    expect(game.deck.cards.length).to.deep.equal(2)
                    expect(game.deck.cards[0].question).to.deep.equal("What is the sound of one hand clapping")
                    expect(game.deck.cards[0].answer).to.deep.equal("Yes?")
                    expect(game.deck.cards[1].question).to.deep.equal("Who cares?")
                    expect(game.deck.cards[1].answer).to.deep.equal("Me")
                })

                describe("Round 2 Test", () => {
                    beforeEach(() => {
                        game.loadIncorrectCards()
                        game.play()

                        game.flip()
                        game.correct()
                        game.next()
                        game.play()
        
                        game.flip()
                        game.incorrect()
                        game.next()
                        game.play()
                    })
    
                    it("should not be able to play again", () => {
                        expect(game.message).to.deep.equal(null)
                    })
        
                    it("should start a new round with only the incorrect pile", () => {
                        game.loadIncorrectCards()
        
                        expect(game.deck.cards.length).to.deep.equal(1)
                        expect(game.deck.cards[0].question).to.deep.equal("Who cares?")
                        expect(game.deck.cards[0].answer).to.deep.equal("Me")
                    })

                    describe("Round 3 Test", () => {
                        beforeEach(() => {
                            game.loadIncorrectCards()
                            game.play()
    
                            game.flip()
                            game.incorrect()
                            game.next()
                            game.play()
                        })
        
                        it("should not be able to play again", () => {
                            expect(game.message).to.deep.equal(null)
                        })
            
                        it("should start a new round with only the incorrect pile", () => {
                            game.loadIncorrectCards()
            
                            expect(game.deck.cards.length).to.deep.equal(1)
                            expect(game.deck.cards[0].question).to.deep.equal("Who cares?")
                            expect(game.deck.cards[0].answer).to.deep.equal("Me")
                        })

                        describe("Round 4 Test", () => {
                            beforeEach(() => {
                                game.loadIncorrectCards()
                                game.play()
        
                                game.flip()
                                game.correct()
                                game.next()
                                game.play()
                            })
            
                            it("should not be able to play again", () => {
                                expect(game.message).to.deep.equal(null)
                            })
                
                            it("should start a new round with only the incorrect pile", () => {
                                game.loadIncorrectCards()
                
                                expect(game.deck.cards.length).to.deep.equal(0)
                            })
                        })
                    })
                })
            })
        })
    })
})
