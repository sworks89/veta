import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor Veta {
    stable var currentValue: Nat = 0;
    var users : HashMap.HashMap<Text, (Text, Text)> = HashMap.HashMap<Text, (Text, Text)>(0, Text.equal, Text.hash);

    public func increment(): async () {
        currentValue += 1;
    };

    public query func getValue(): async Nat {
        currentValue;
    };

    public query func find(name : Text) : async ? (Text, Text) {
        return users.get(name);
    };

    public func insert(name: Text, phone: Text, address: Text) : async () {
        users.put(name, (phone, address));
    };

    public func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };

    //use user.mo to create/update user data
};
