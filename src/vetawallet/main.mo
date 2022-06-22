import Database "./database";
import Types "./types";
import Utils "./utils";

actor VetaWallet {
  var db: Database.Directory = Database.Directory();

  type NewUserData = Types.NewUserData;
  type UserData = Types.UserData;
  type UserId = Types.UserId;

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

  public shared query(msg) func getOwnId(): async UserId { msg.caller }

};
