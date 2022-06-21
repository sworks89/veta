import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import TrieSet "mo:base/TrieSet";

module {

    public type DataFilter = {
        startsWith: ?Text;
        contains: ?Text;
    };

    public class DataStore<T>() {
        private var data: HashMap.HashMap<Text, T> = 
                HashMap.HashMap<Text, T>(10, Text.equal, Text.hash);


        private func keyStartsWith(key: Text, startsWith: ?Text): Bool {
            switch (startsWith) {
                case null {
                    return true;
                };
                case (?startsWith) {
                    return Text.startsWith(key, #text startsWith);
                };
            };
        };

        private func keyContains(key: Text, contains: ?Text): Bool {
            switch (contains) {
                case null {
                    return true;
                };
                case (?contains) {
                    return Text.contains(key, #text contains);
                };
            };
        };

				public func set(value: T) {
						// let entries: Trie<Text, T> = ;
						// data := HashMap.fromIter<Text, T>(entries , 10, Text.equal, Text.hash);
				};

        public func put(key: Text, value: T) {
            data.put(key, value);
        };

        public func get(key: Text): ?T {
            return data.get(key);
        };

        public func del(key: Text): ?T {
            let entry: ?T = get(key);

            switch (entry) {
                case (?entry) {
                    data.delete(key);
                };
                case (null) {};
            };

            return entry;
        };

        public func list(filter: ?DataFilter): [(Text, T)] {
            let entries: Iter.Iter<(Text, T)> = data.entries();

            switch (filter) {
                case null {
                    return Iter.toArray(entries);
                };
                case (?filter) {
                    let keyValues: [(Text, T)] = Iter.toArray(entries);

                    let {startsWith; contains} = filter;

                    let values: [(Text, T)] = 
                                Array.mapFilter<(Text, T), (Text, T)>
                    (keyValues, func ((key: Text, value: T)) : ?(Text, T) {
                        if (keyStartsWith(key, startsWith) and 
                            keyContains(key, contains)) {
                            return ?(key, value);
                        };

                        return null;
                    });

                    return values;
                };
            };
        };

        public func preupgrade(): HashMap.HashMap<Text, T> {
            return data;
        };

        public func postupgrade(stableData: [(Text, T)]) {
            data := HashMap.fromIter<Text, T>(stableData.vals(), 10, Text.equal, Text.hash);
        };

    };
    
}