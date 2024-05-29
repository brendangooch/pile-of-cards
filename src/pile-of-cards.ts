/**
 * 
 */

import PlayingCard from "@brendangooch/playing-card";

export default class PileOfCards {

    private cards: PlayingCard[] = [];

    public get hasCards(): boolean {
        return this.cards.length > 0;
    }

    public viewTop(): PlayingCard | null {
        const top = this.cards[0];
        if (!top) {
            return null;
        }
        return top.clone();
    }

    public removeTop(): PlayingCard | null {
        const top = this.cards.shift();
        if (!top) {
            return null;
        }
        return top;
    }

    public append(cards: PlayingCard | PileOfCards): void {
        if (cards instanceof PlayingCard) this.appendCard(cards);
        else this.appendPile(cards);
    }

    public prepend(cards: PlayingCard | PileOfCards): void {
        if (cards instanceof PlayingCard) this.prependCard(cards);
        else this.prependPile(cards);
    }

    public clear(): void {
        this.cards.length = 0;
    }

    public flip(): void {
        this.cards.reverse();
    }

    private appendCard(card: PlayingCard): void {
        this.cards.push(card);
    }

    private appendPile(pile: PileOfCards): void {
        while (pile.hasCards) {
            const next = pile.removeTop();
            if (next) {
                this.appendCard(next);
            }
        }
    }

    private prependCard(card: PlayingCard): void {
        this.cards.unshift(card);
    }

    private prependPile(pile: PileOfCards): void {
        pile.flip();
        while (pile.hasCards) {
            const next = pile.removeTop();
            if (next) {
                this.prependCard(next);
            }
        }
    }

}