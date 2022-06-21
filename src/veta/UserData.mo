import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

import DataStore "./DataStore";
import Types "types";

actor class UserData() = this {
		type CanisterId = Principal;
		type Data = Types.UserData;
		type PersonalInfo = Types.PersonalInfo;


		// private let dataStore: DataStore.DataStore<Data> = DataStore.DataStore<Data>();
    private let personalInfoStore: DataStore.DataStore<PersonalInfo> = DataStore.DataStore<PersonalInfo>();

    private stable var personalInfo : [(Text, PersonalInfo)] = [];

    private stable var data: Data = {
			personalInfo = {
				name  = "";
				address  = "";
				email  = "";
				mobileNumber  = "";
				dob = "";
				photo = "";
			};
			socialData = {
				interests = [];
				nickName = "";
				following = [];
				follower = [];
				post = [];
			};
		};

		// public func setPersonalInfo (info : PersonalInfo): async () {
		// 	data["personalInfo"] := info;
		// };

		// public func setSocialNickName (_nickname : Text): async () {
			
		// 	data.socialData.nickName := _nickname;
		// };

    // public func set(data: Data): async () {
    //     userData := ?data;
    // };

    public query func getUserData() : async Data {
        return data;
    };

    public query func id() : async CanisterId {
        return Principal.fromActor(this);
    };


		// PERSONAL INFORMATION
		public query func getPersonalInfo(key: Text) : async (?PersonalInfo) {
        let entry: ?PersonalInfo = personalInfoStore.get(key);
        return entry;
    };

		public func setPersonalInfo(info: PersonalInfo) : async () {
			personalInfoStore.set(info);
    };

    public func setPersonalInfoKey(key: Text, data: PersonalInfo) : async () {
        personalInfoStore.put(key, data);
    };

    public func delPersonalInfo(key: Text) : async () {
        let entry: ?PersonalInfo = personalInfoStore.del(key);
    };

    public query func listPersonalInfo(filter: ?DataStore.DataFilter) : async [(Text, PersonalInfo)] {
        let results: [(Text, PersonalInfo)] = personalInfoStore.list(filter);
        return results;
    };

    system func preupgrade() {
        personalInfo := Iter.toArray(personalInfoStore.preupgrade().entries());
    };

    system func postupgrade() {
        personalInfoStore.postupgrade(personalInfo);
        personalInfo := [];
    };
};