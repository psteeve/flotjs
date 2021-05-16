import { ReadStream } from './read-stream';


const accessor = ReadStream.on(["Bob", "Dave", "Earl",
                                "Frank", "Harold",
                                "Jim", "Mike",
                                "Peter", "Rick",
                                "Sam", "Tom"]);

//accessor.next === "Bob";

// accessor.nextMatchFor("Dave");

// accessor.peek() === "Earl";

// accessor.next === "Earl";

// accessor.peekFor("Frank") === true;

// accessor.next === "Harold";

// accessor.upTo("Rick") === ["Jim", "Kim", "Peter"];

// accessor.position === 10;

// accessor.skip(1)  === accessor;

// accessor.next === "Tom";

// accessor.atEnd === true;

// accessor.reset === accessor;

// accessor.skipTo("Frank") === true;

// accessor.next === "Harold";
