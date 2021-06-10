/* 
 * Is a superclass that specifies the accessing protocol for streaming
 * over collections.
 * Included in this protocol are method for reading (retrieving) and writing (storing)
 * in to collection, although not all the subclasses of class Stream can support
 * both kind of accessing operations.
 */

export abstract class Stream {

    /*
     *  Answer whether it cannot access any more objects in the collection.
     */

    public atEnd() {
        throw Error("Must be implemented");
    }

    /*
     * Answer the collection of the stream
     */
    public get contents(): ArrayLike<any> {
        throw Error("Must be implemented");
    }

}
