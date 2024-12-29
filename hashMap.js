class HashMap {
    constructor(capacity, loadFactor) {
        this.capacity = capacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = new Array(capacity).fill(null).map(() => []);
    }

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % this.capacity;
    }

    hashWithNewCapacity(key, newCapacity) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode % newCapacity;
    }

    set(key, value) {
        const index = this.hash(key);

        // Initialize the bucket if it's not already initialized
        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        // Check if the key already exists in the bucket
        for (let i = 0; i < this.buckets[index].length; i++) {
            if (this.buckets[index][i][0] === key) {
                this.buckets[index][i][1] = value;
                return;
            }
        }

        // Add the key-value pair to the bucket
        this.buckets[index].push([key, value]);
        this.size++;

        // Resize the hash map if the load factor exceeds the threshold
        if (this.size / this.capacity > this.loadFactor) {
            this.resize();  // Now resize will correctly update the buckets and capacity
        }
    }

    resize() {
        const newCapacity = this.capacity * 2;
        const newBucket = new Array(newCapacity).fill(null).map(() => []);

        // Rehash all existing keys into new buckets
        for (let i = 0; i < this.capacity; i++) {
            const bucket = this.buckets[i];
            if (bucket) {
                for (let j = 0; j < bucket.length; j++) {
                    const [key, value] = bucket[j];
                    const index = this.hashWithNewCapacity(key, newCapacity);
                    newBucket[index].push([key, value]);
                }
            }
        }

        // Update the buckets and capacity
        this.buckets = newBucket;
        this.capacity = newCapacity;
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (!bucket) {
            return null;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (!bucket) {
            console.log('false');
            return false;
        } else {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i][0] === key) {
                    console.log('true');
                    return true;
                }
            }
        }
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        if (!bucket) {
            return false;
        }

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
    }

    length() {
        console.log(this.size);
        return this.size;
    }

    clear() {
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    keys() {
        const keys = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.buckets[i]) {
                for (let j = 0; j < this.buckets[i].length; j++) {
                    keys.push(this.buckets[i][j][0]);
                }
            }
        }
        console.log(keys);
    }

    values() {
        const values = [];
        for (let i = 0; i < this.capacity; i++) {
            if (this.buckets[i]) {
                for (let j = 0; j < this.buckets[i].length; j++) {
                    values.push(this.buckets[i][j][1]);
                }
            }
        }
        console.log(values);
    }

    entries() {
        const entries = [];
        for (let i = 0; i < this.capacity; i++) {
            const bucket = this.buckets[i];
            if (bucket && bucket.length > 0) {
                for (let j = 0; j < bucket.length; j++) {
                    entries.push(bucket[j]);
                }
            }
        }
        console.log(entries);
        return entries;
    }
}

module.exports = HashMap;



