import { Stream } from "./stream";

interface Sequence extends ArrayLike<any> {
    slice(firstIndex: number, lastIndex: number): Sequence
    forEach(f: (e: any) => any): void
}

/*
 * Set the reference position to the beginning of the collection.
 */
export function reset(s: PositionableStream): PositionableStream {
    s.position = -1;
    return s;
}

export function next(s: PositionableStream): any | undefined {
    if (!s.atEnd()) {
        s.position = s.position + 1;
        return s.contents[s.position];
    }
    return undefined;
}

export function getNext(s: PositionableStream, n: number): ArrayLike<any> {
    const startPosition = s.position < 0 ? 0 : s.position;
    const endPosition = startPosition + n;
    const value = (s.contents as Sequence).slice(startPosition, endPosition);

    s.position = endPosition
    return value;
}

export function nextMatchFor(s: PositionableStream, value: any): boolean {
    return next(s) === value;
}

/*
 * Answer the next element in the collection (as in the message
 * next), but do not change the position reference.
 * Answer undefined if the reference position is at the end.
 */

export function peek(s: PositionableStream): any | undefined {
    if (!s.atEnd()) {
        return s.contents[s.position + 1];
    }
    return undefined;
}

/*
 * Determine the response to the message peek. If it is the
 * same as the argument, value, then increment the position
 * reference and answer true. Otherwise answer false and do not
 * change the position reference.
 */
export function peekFor(s: PositionableStream, value: any): boolean {
    if (value && peek(s) === value) {
        s.position = s.position + 1;
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
export function upTo(s: PositionableStream, value: any): ArrayLike<any> {
    const response = [];

    let someValue = null;

    while (!s.atEnd() && someValue !== value) {
        someValue = next(s);

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
 * Set the reference position to be the current position plus the argument, someValue,
 * possibly adjusting the result so as to remain within the bounds of the collection.
 */
export function skip(s: PositionableStream, someValue: number) {

    if (s.setPosition(s.position + someValue) === undefined) {
        s.setToEnd();
    }
}

/*
 * Set the reference position to be past the next occurence of the argument, value,
 * in the collection. Answer wheter such an occurence existed.
 */
export function skipTo(s: PositionableStream, value: any): boolean {
    while (!s.atEnd()) {

        if (next(s) === value) {
            skip(s, 1);
            return true;
        }
    }

    return false;
}


/*
 * Answer the contents from the current position to the  end of the stream
 */
export function upToEnd(s: PositionableStream): ArrayLike<any> {
    const response = [];

    while (!s.atEnd()) {
        response.push(next(s));
    }

    if (typeof s.contents === 'string') {
        return response.join('');
    }

    return response;
}

export function doEach(s: PositionableStream, f: (e: any) => any): void {
    const values = [...(s.contents as Array<any>)];

    values.forEach(x => f(x));
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

    public set position(value: number) {
        this.setPosition(value);
    }

    /*  
     * Answer true if the collection has no elements otherwise, answer false.
     */

    public isEmpty(): boolean {
        return this._values.length === 0;
    }


    /*
     * Answer a copy of the collection's contents in reverse order.
     */

    public get reverseContents(): any {
        return;
    }

    /*
     * Set the current reference position for accessing the collection to
     * be the argument, someValue. Answer someValue. 
     * If the argument is not within the bounds of the collection, return undefined.
     */

    public setPosition(someValue: number): number | undefined {
        if (someValue >= 0 && someValue <= this._values.length - 1) {
            this._position = someValue;
            return someValue;
        }
        return undefined;
    }

    /*
     * Set the receiver's position reference to the end of the collection.
     */
    public setToEnd(): void {
        this._position = this._values.length - 1;
    }

    public atEnd(): boolean {
        return this._position === this._values.length - 1;
    }


    public get contents(): ArrayLike<any> {
        return this._values;
    }

}
