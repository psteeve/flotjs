import { Stream } from "./stream";

interface Sequence extends ArrayLike<any> {
    slice(firstIndex: number, lastIndex: number): Sequence
    forEach(f: (e: any) => any): void
}


/*
 * It provide additional protocol appropriate to streams that can reposition their position references
 *
 */
export abstract class PositionableStream extends Stream {
    private _position: number = -1;
    private _values: ArrayLike<any>;

    constructor(values: ArrayLike<any>) {
        super();
        this._values = values;
    }

    public get position(): number {
        return this._position;
    }

    /*  
     * Answer true if the collection has no elements otherwise, answer false.
     */

    public isEmpty(): boolean {
        return this._values.length === 0;
    }

    /*
     * Answer the next element in the collection (as in the message
     * next), but do not change the position reference.
     * Answer undefined if the reference position is at the end.
     */

    public get peek(): any | undefined {
        if (!this.atEnd()) {
            return this._values[this._position + 1];
        }
        return undefined;
    }

    /*
     * Determine the response to the message peek. If it is the
     * same as the argument, value, then increment the position
     * reference and answer true. Otherwise answer false and do not
     * change the position reference.
     */
    public peekFor(value: any): boolean {
        if (value && this.peek === value) {
            this._position = this._position + 1;
            return true;
        }
        return false;
    }

    /*
     * Answer a collection of elements starting with the next
     * element accessed in the collection, and up to, not inclusif
     * of, the next element that is equal to the argument value. If value
     * is not in the collection, answer the entire rest of the collection.
     */
    public upTo(value: any): ArrayLike<any> {
        const response = [];

        let someValue = null;

        while (!this.atEnd() && someValue !== value) {
            someValue = this.next;

            if (someValue !== value) {
                response.push(someValue);
            }
        }


        // TODO find a generic way to implement this
        if (typeof value === 'string') {
            return response.join('');
        }

        return response;
    }

    /*
     * Answer a copy of the collection's contents in reverse order.
     */

    public get reverseContents(): any {
        return;
    }


    /*
     * Answer the contents from the current position to the  end of the stream
     */
    public get upToEnd(): ArrayLike<any> {
        const response = [];

        while (!this.atEnd()) {
            response.push(this.next);
        }

        if (typeof this.contents === 'string') {
            return response.join('');
        }

        return response;
    }


    /*
     * Set the current reference position for accessing the collection to
     * be the argument, someValue. Answer someValue. 
     * If the argument is not within the bounds of the collection, return undefined.
     */

    public setPosition(someValue: number): number | undefined {
        if (someValue >= 0 && someValue <= this._values.length) {
            this._position = someValue;
            return someValue;
        }
        return undefined;
    }

    /*
     * Set the reference position to the beginning of the collection.
     */

    public reset(): void {
        this._position = -1;
    }

    /*
     * Set the receiver's position reference to the end of the collection.
     */
    public setToEnd(): void {
        this._position = this._values.length;
    }

    /*
     * Set the reference position to be the current position plus the argument, someValue,
     * possibly adjusting the result so as to remain within the bounds of the collection.
     */
    public skip(someValue: number) {

        if (this.setPosition(this._position + someValue) === undefined) {
            this.setToEnd();
        }
    }

    /*
     * Set the reference position to be past the next occurence of the argument, value,
     * in the collection. Answer wheter such an occurence existed.
     */
    public skipTo(value: any): boolean {
        while (!this.atEnd()) {

            if (this.next === value) {
                this.skip(1);
                return true;
            }
        }

        return false;
    }

    public atEnd(): boolean {
        return this._position === this._values.length;
    }

    public get next(): any | undefined {
        if (!this.atEnd()) {
            this._position = this._position + 1;
            return this._values[this._position];
        }
        return undefined;
    }

    public getNext(n: number): ArrayLike<any> {
        const startPosition = this._position < 0 ? 0 : this._position;
        const endPosition = startPosition + n;
        const value = (this._values as Sequence).slice(startPosition, endPosition);

        this._position = endPosition
        return value;
    }

    public get contents(): ArrayLike<any> {
        return this._values;
    }

    public nextMatchFor(value: any): boolean {
        return this.next === value;
    }

    public doEach(f: (e: any) => any): void {
        const values = [...(this._values as Array<any>)];

        values.forEach(x => f(x));
    }
}
