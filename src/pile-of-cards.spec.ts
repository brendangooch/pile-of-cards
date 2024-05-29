/**
 * 
 */

import PlayingCard from "@brendangooch/playing-card";
import PileOfCards from "./pile-of-cards.js";

describe('PileOfCards', () => {
    testAll();
});

function testAll(): void {
    testHasCards();
    testAppend();
    testPrepend();
    testViewTopCard();
    testRemoveTopCard();
    testClear();
    testFlip();

}

function testHasCards(): void {

    // correctly identifies when there are cards in the pile
    test('correctly identifies whether there are cards in the pile or not', () => {

        const pileA = new PileOfCards();

        // no cards
        expect(pileA.hasCards).not.toBeTruthy();

        // add a card
        pileA.append(new PlayingCard(0));
        expect(pileA.hasCards).toBeTruthy();

        // clear
        pileA.clear();
        expect(pileA.hasCards).not.toBeTruthy();

        // add a pile
        const pileB = new PileOfCards();
        pileB.append(new PlayingCard(0));
        pileA.append(pileB);
        expect(pileA.hasCards).toBeTruthy();

        // clear
        pileA.clear();
        expect(pileA.hasCards).not.toBeTruthy();

    });

}

function testAppend(): void {

    // appends a playing card
    test('appends a playing card as expected', () => {
        const pile = new PileOfCards();
        pile.append(new PlayingCard(1));
        pile.append(new PlayingCard(2));
        pile.append(new PlayingCard(3));
        const cardA = <PlayingCard>pile.viewTop();
        expect(cardA.isRank(1)).toBeTruthy();
    });

    // appends a pile of cards
    test('appends a pile of cards as expected', () => {
        const pileA = new PileOfCards();
        pileA.append(new PlayingCard(4));
        const pileB = new PileOfCards();
        pileB.append(new PlayingCard(1));
        pileB.append(new PlayingCard(2));
        pileB.append(new PlayingCard(3));
        pileA.append(pileB);
        const cardA = <PlayingCard>pileA.viewTop();
        expect(cardA.isRank(4)).toBeTruthy();
    });

    // appended pile has no cards after append
    test('appended pile has no cards after append', () => {
        const pileA = new PileOfCards();
        const pileB = new PileOfCards();
        pileB.append(new PlayingCard(1));
        pileB.append(new PlayingCard(2));
        pileB.append(new PlayingCard(3));
        pileA.append(pileB);
        expect(pileB.hasCards).not.toBeTruthy();
    });

}

function testPrepend(): void {

    // prepends a playing card
    test('prepends a playing card as expected', () => {
        const pile = new PileOfCards();
        pile.prepend(new PlayingCard(1));
        pile.prepend(new PlayingCard(2));
        pile.prepend(new PlayingCard(3));
        const cardA = <PlayingCard>pile.viewTop();
        expect(cardA.isRank(3)).toBeTruthy();
    });

    // prepends a pile of cards
    test('prepends a pile of cards as expected', () => {
        const pileA = new PileOfCards();
        pileA.append(new PlayingCard(4));
        const pileB = new PileOfCards();
        pileB.append(new PlayingCard(1));
        pileB.append(new PlayingCard(2));
        pileB.append(new PlayingCard(3));
        pileA.prepend(pileB);
        const cardA = <PlayingCard>pileA.viewTop();
        expect(cardA.isRank(1)).toBeTruthy();
    });

    // prepended pile has no cards after prepend
    test('prepended pile has no cards after prepend', () => {
        const pileA = new PileOfCards();
        const pileB = new PileOfCards();
        pileB.append(new PlayingCard(1));
        pileB.append(new PlayingCard(2));
        pileB.append(new PlayingCard(3));
        pileA.prepend(pileB);
        expect(pileB.hasCards).not.toBeTruthy();
    });

}

function testViewTopCard(): void {

    // returns a COPY of the correct top card
    test('returns a COPY of the correct top card', () => {
        const pile = new PileOfCards();
        const joker = new PlayingCard(0);
        const ace = new PlayingCard(1);
        const two = new PlayingCard(2);
        pile.append(joker);
        pile.append(ace);
        pile.append(two);
        const topCard = <PlayingCard>pile.viewTop();
        expect(topCard.isJoker()).toBeTruthy();
        expect(topCard === joker).not.toBeTruthy();
    });

}

function testRemoveTopCard(): void {

    // removes and returns the ACTUAL top card from the pile
    test('removes and returns the ACTUAL top card from the pile', () => {
        const pile = new PileOfCards();
        const joker = new PlayingCard(0);
        const ace = new PlayingCard(1);
        const two = new PlayingCard(2);
        pile.append(joker);
        pile.append(ace);
        pile.append(two);

        const firstCard = <PlayingCard>pile.removeTop();
        expect(firstCard.isJoker()).toBeTruthy();
        expect(firstCard === joker).toBeTruthy();

        const secondCard = <PlayingCard>pile.removeTop();
        expect(secondCard.isRank(1)).toBeTruthy();
        expect(secondCard === ace).toBeTruthy();

        const thirdCard = <PlayingCard>pile.removeTop();
        expect(thirdCard.isRank(2)).toBeTruthy();
        expect(thirdCard === two).toBeTruthy();

        expect(pile.hasCards).not.toBeTruthy();

    });

}

function testClear(): void {

    // empties the pile
    test('empties the pile', () => {
        const pile = new PileOfCards();
        pile.append(new PlayingCard(1));
        pile.append(new PlayingCard(2));
        pile.append(new PlayingCard(3));
        pile.append(new PlayingCard(4));
        expect(pile.hasCards).toBeTruthy();
        pile.clear();
        expect(pile.hasCards).not.toBeTruthy();
    });

}

function testFlip(): void {

    // reverses the order of the cards in the pile
    test('reverses the order of the cards in the pile', () => {
        const pile = new PileOfCards();
        pile.append(new PlayingCard(1));
        pile.append(new PlayingCard(2));
        pile.append(new PlayingCard(3));
        const cardA = <PlayingCard>pile.viewTop();
        expect(cardA.isRank(1)).toBeTruthy();
        expect(cardA.isRank(3)).not.toBeTruthy();
        pile.flip();
        const cardB = <PlayingCard>pile.viewTop();
        expect(cardB.isRank(3)).toBeTruthy();
        expect(cardB.isRank(1)).not.toBeTruthy();
    });

}
