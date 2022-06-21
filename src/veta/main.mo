import Cycles "mo:base/ExperimentalCycles";
import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";

import Types "types";
import UserData "./UserData"; 

actor {
		type UserDataCanister = UserData.UserData;
    type CanisterId = Principal;
    type UserId = Principal; 
		type Data = Types.UserData; 
		type PersonalInfo = Types.PersonalInfo;

    private func isPrincipalEqual(x: Principal, y: Principal): Bool { x == y };

    private var canisters: HashMap.HashMap<UserId, UserDataCanister> = HashMap.HashMap<UserId, UserDataCanister>(10, isPrincipalEqual, Principal.hash);
		// private var canisters
    private stable var upgradeCanisters : [(Principal, UserDataCanister)] = [];

		// Todo: Dynamically add cycles
    public shared({caller}) func create(): async (CanisterId) {
        Cycles.add(1_000_000_000_000);
        let canister = await UserData.UserData(); 
        let id: CanisterId = await canister.id();  
        canisters.put(caller, canister); 
        return id;
    };

		// Get canister id
    public shared({caller}) func getId() : async CanisterId {
        let canister: ?UserDataCanister = canisters.get(caller);
// let cowsay = actor("7igbu-3qaaa-aaaaa-qaapq-cai"): actor { cowsay: (Text) -> async Text };
        // return await cowsay.cowsay(message);
				switch (canister) {
					case (?canister) { 
						let id: CanisterId = await canister.id();
						return id;
					};
					case (null) {
						throw Error.reject("User Not Found")
					};
				}; 
    };
		
		// Get canister data
		// public shared({caller}) func get() : async Data  {
		// 		let canister: ?UserDataCanister = canisters.get(caller);
		// 		switch (canister) {
		// 			case (?canister) { 
		// 				 let result: Data = await canister.get();
		// 					return result;
		// 			};
		// 			case (null) {
		// 				throw Error.reject("User Not Found")
		// 			};
		// 		};
    // };


		// set PersonalInfo	
		public shared({caller}) func setPersonalInfo(info : PersonalInfo) : async ()  {
				let canister: ?UserDataCanister = canisters.get(caller);
				switch (canister) {
					case (?canister) { 
						  await canister.setPersonalInfo(info); 
					};
					case (null) {
						throw Error.reject("User Not Found")
					};
				};
    };

    system func preupgrade() {
        upgradeCanisters := Iter.toArray(canisters.entries());
    };

    system func postupgrade() {
        canisters := HashMap.fromIter<UserId, UserDataCanister>(upgradeCanisters.vals(), 10, isPrincipalEqual, Principal.hash);
        upgradeCanisters := [];
    };

};
