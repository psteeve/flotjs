/* 
 * Is a superclass that specifies the accessing protocol for streaming
 * over collections.
 * Included in this protocol are method for reading (retrieving) and writing (storing)
 * in to collection, although not all the subclasses of class Stream can support
 * both kind of accessing operations.
 */

export abstract class Stream {

    /*
     * Answer the next object accessible in the collection
     */
    public get next() {
        throw Error("Must be implemented");
    }

    /*
     * Answer the next n number of objects accessible in the collection.
     */
    public getNext(_n: number){
        throw Error("Must be implemented");
    }

    /*
     * Access the next value and answer whether it is equal to the argument, value.
     */
    public nextMatchFor(_value: any) {
        throw Error("Must be implemented");        
    }

    /*
     * Store the argument, value, as the next element accessible in the collection. Answer value.
     */

    public set nextPut(_value: any) {
        throw Error("Must be implemented");
    }

    /*
     * Store the elements in the argument, values, as the next elements accessible in the collection.
     * answer values
     */

    public nextPutAll(values: any) {
        throw Error("Must be implemented");
    }


    /*
     *  Answer whether it cannot access any more objects in the collection.
     */

    public atEnd() {
        throw Error("Must be implemented");
    }

    /*
     * Evaluate the argument, f, for each of the remaining
     * elements that can accessed in the collection.
     */

    public doEach(f: (e: any) => any) {
        throw Error("Must be implemented");
    }

    /*
     * Answer the collection of the stream
     */
    public get contents(): ArrayLike<any> {
        throw Error("Must be implemented");
    }

}
