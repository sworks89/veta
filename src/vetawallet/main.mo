import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Types "./types";

persistent actor VetaWallet {

  type NewUserData = Types.NewUserData;
  type UserData = Types.UserData;
  type UserId = Types.UserId;
  type UID = Types.UID;
  type Profile = Types.Profile;
  type Record = Types.Record;

  // ── State (implicitly stable in persistent actor) ──────────────────

  let userDB = Map.empty<UserId, UserData>();
  let sharedProfiles = Map.empty<UID, Profile>();
  let dataRegistry = Map.empty<UID, Record>();

  // ── Guards ─────────────────────────────────────────────────────────

  private func requireAuthenticated(caller : Principal) {
    if (Principal.isAnonymous(caller)) {
      Runtime.trap("anonymous caller not allowed");
    };
  };

  private func requireOwner(caller : Principal, ownerId : Principal) {
    requireAuthenticated(caller);
    if (caller != ownerId) {
      Runtime.trap("caller does not own this record");
    };
  };

  private func validateText(value : Text, maxLen : Nat, label : Text) {
    if (value.size() > maxLen) {
      Runtime.trap(label # " exceeds max length");
    };
  };

  // ── Healthcheck ────────────────────────────────────────────────────

  public func healthcheck() : async Bool { true };

  // ── User CRUD ──────────────────────────────────────────────────────

  public shared(msg) func create(userData : UserData) : async () {
    requireAuthenticated(msg.caller);
    validateText(userData.name, 128, "name");
    let stored : UserData = {
      id = msg.caller;
      verified = false;
      name = userData.name;
      profiles = userData.profiles;
      data = userData.data;
    };
    Map.add(userDB, Principal.compare, msg.caller, stored);
  };

  public shared(msg) func update(userData : UserData) : async () {
    requireOwner(msg.caller, userData.id);
    validateText(userData.name, 128, "name");
    if (userData.data.size() > 1000) {
      Runtime.trap("data array exceeds max size");
    };
    if (userData.profiles.size() > 50) {
      Runtime.trap("profiles array exceeds max size");
    };
    Map.add(userDB, Principal.compare, userData.id, userData);
  };

  public query func get(userId : UserId) : async UserData {
    switch (Map.get(userDB, Principal.compare, userId)) {
      case (?user) user;
      case null {
        {
          id = userId;
          verified = false;
          name = "";
          profiles = [];
          data = [];
        };
      };
    };
  };

  // ── Profile Sharing ────────────────────────────────────────────────

  public shared(msg) func shareProfile(profile : Profile) : async () {
    requireAuthenticated(msg.caller);
    Map.add(sharedProfiles, Text.compare, profile.id, profile);
  };

  public query func getSharedProfile(id : UID) : async ?Profile {
    Map.get(sharedProfiles, Text.compare, id);
  };

  // ── Data Registry ──────────────────────────────────────────────────

  public shared(msg) func addRecord(record : Record) : async () {
    requireAuthenticated(msg.caller);
    Map.add(dataRegistry, Text.compare, record.recordId, record);
  };

  public query func getRecord(id : UID) : async ?Record {
    Map.get(dataRegistry, Text.compare, id);
  };

  // ── Identity ───────────────────────────────────────────────────────

  public shared query(msg) func getOwnId() : async UserId { msg.caller };
};
