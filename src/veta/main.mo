import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import User "user";
import Types "types";

import UserDb "user";

actor Veta {
    type User = Types.User;
	type UserId = Types.UserId;

	var userDB: User.UserDB = User.UserDB();

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

    //User DB functions
    public func healthcheck(): async Bool { true };

 
	public func registerUser(user: User): async () {
		userDB.register(user);
	};

    public func verifyUser(uid: UserId): async () {
		userDB.verify(uid);
	};


    public func getUser(uid: UserId): async User  {
        let existing = userDB.findById(uid);
            switch (existing) {
                case (?existing) { existing };
                case (null) {
                    throw Error.reject("Not Found")
                };
            };
	};
};
