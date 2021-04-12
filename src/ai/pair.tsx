class Pair {
    a: number;
    b: number;

    constructor(p: number, q: number) {
        this.a = p;
        this.b = q;
    }

    public equals(o: any): boolean {
        if (o instanceof Pair) {
            //Pair p = (Pair) o;
            let p=o;
            return p.a === this.a && p.b === this.b;
        }
        return false;
    }

    public hashCode():number {
        //return Integer.valueOf(a).hashCode() * 31 + Integer.valueOf(b).hashCode();
        return this.a*31+this.b;
    }
}

export default Pair;
