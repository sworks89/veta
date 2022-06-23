import Database "./database";
import Types "./types";
import Utils "./utils";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

actor VetaWallet {
  var db: Database.Directory = Database.Directory();
	
  type NewUserData = Types.NewUserData;
  type UserData = Types.UserData;
  type UserId = Types.UserId;
	type UID = Types.UID;
	type Profile = Types.Profile;


	func isUidEq(x: UID, y: UID): Bool { x == y };

	let sharedProfile = HashMap.HashMap<UID, Profile>(1, isUidEq, Text.hash);

  // Healthcheck
  public func healthcheck(): async Bool { true };

  // UserData
  public shared(msg) func create(userData: UserData): async () {
    db.createUser(msg.caller, userData);
  };

  public shared(msg) func update(userData: UserData): async () {
    db.updateUser(userData.id, userData);
  };

  public query func get(userId: UserId): async UserData {
    Utils.getUserData(db, userId)
  };
	public func shareProfile(profile: Profile): async () {
		sharedProfile.put(profile.id, profile);
	};

	public query func getSharedProfile(id: UID): async ?Profile {
		sharedProfile.get(id);
	};

  public shared query(msg) func getOwnId(): async UserId { msg.caller };

};
