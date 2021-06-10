import { PositionableStream } from "./positionable-stream";

interface Sequence extends ArrayLike<any> {
    slice(firstIndex: number, lastIndex: number): Sequence
}

let stream: ReadStream;

/*
 * Answer an instance of a kind of PositionableStream
 * that streams over the argument, values. 
 * Or stream over a subcollection of the argument, values,
 * from firstIndex to lastIndex.
 */
export function streamOn(values: ArrayLike<any>): ReadStream {
    stream = new ReadStream(values);
    return stream;
}


export function streamOnFrom(values: ArrayLike<any>, fromFirstIndex: number, toLastIndex: number): ReadStream {
    return streamOn((values as Sequence).slice(fromFirstIndex, toLastIndex));
}


export class ReadStream extends PositionableStream {

    /*
     * Answer an instance of a kind of PositionableStream
     * that streams over ther argument, values.
     */
    public constructor(values: any) {
        super(values);

    }

}
