import { PositionableStream } from "./positionable-stream";

interface Sequence extends ArrayLike<any> {
    slice(firstIndex: number, lastIndex: number): Sequence
}

export class ReadStream extends PositionableStream {
    
    /*
     * Answer an instance of a kind of PositionableStream
     * that streams over the argument, values. 
     * Or stream over a subcollection of the argument, values,
     * from firstIndex to lastIndex.
     */
    public static on(values: ArrayLike<any>): ReadStream {
        return new ReadStream(values);
    }

    public static onFrom(values: ArrayLike<any>, fromFirstIndex: number, toLastIndex: number): ReadStream {
        
        return ReadStream.on((values as Sequence).slice(fromFirstIndex, toLastIndex));
    }

    /*
     * Answer an instance of a kind of PositionableStream
     * that streams over ther argument, values.
     */
    public constructor(values: any) {
        super(values);
        
    }

}
