import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Result "mo:core/Result";
import Types "./types";

persistent actor VetaWallet {

  type NewUserData = Types.NewUserData;
  type UserData = Types.UserData;
  type UserId = Types.UserId;
  type UID = Types.UID;
  type Profile = Types.Profile;
  type Record = Types.Record;

  type ApiResult = Result.Result<(), Text>;

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

  private func validateText(value : Text, maxLen : Nat, label : Text) : ?Text {
    if (value.size() > maxLen) {
      return ?(label # " exceeds max length of " # debug_show(maxLen));
    };
    null;
  };

  private func validateUserData(userData : UserData) : ?Text {
    switch (validateText(userData.name, 128, "name")) {
      case (?err) return ?err;
      case null {};
    };
    if (userData.data.size() > 1000) {
      return ?"data array exceeds max size of 1000";
    };
    if (userData.profiles.size() > 50) {
      return ?"profiles array exceeds max size of 50";
    };
    for (entry in userData.data.vals()) {
      switch (validateText(entry.dataContent, 10240, "dataContent")) {
        case (?err) return ?err;
        case null {};
      };
      switch (validateText(entry.dataType, 128, "dataType")) {
        case (?err) return ?err;
        case null {};
      };
    };
    for (profile in userData.profiles.vals()) {
      switch (validateText(profile.profileName, 128, "profileName")) {
        case (?err) return ?err;
        case null {};
      };
      if (profile.data.size() > 500) {
        return ?"profile data array exceeds max size of 500";
      };
    };
    null;
  };

  // ── Healthcheck ────────────────────────────────────────────────────

  public func healthcheck() : async Bool { true };

  // ── User CRUD ──────────────────────────────────────────────────────

  public shared(msg) func create(userData : UserData) : async ApiResult {
    requireAuthenticated(msg.caller);
    switch (validateText(userData.name, 128, "name")) {
      case (?err) return #err(err);
      case null {};
    };
    switch (Map.get(userDB, Principal.compare, msg.caller)) {
      case (?_) return #err("Account already exists");
      case null {};
    };
    let stored : UserData = {
      id = msg.caller;
      verified = false;
      name = userData.name;
      profiles = userData.profiles;
      data = userData.data;
    };
    Map.add(userDB, Principal.compare, msg.caller, stored);
    #ok();
  };

  public shared(msg) func update(userData : UserData) : async ApiResult {
    requireAuthenticated(msg.caller);
    if (msg.caller != userData.id) {
      return #err("Caller does not own this record");
    };
    switch (validateUserData(userData)) {
      case (?err) return #err(err);
      case null {};
    };
    Map.add(userDB, Principal.compare, userData.id, userData);
    #ok();
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

  public shared(msg) func shareProfile(profile : Profile) : async ApiResult {
    requireAuthenticated(msg.caller);
    switch (validateText(profile.profileName, 128, "profileName")) {
      case (?err) return #err(err);
      case null {};
    };
    Map.add(sharedProfiles, Text.compare, profile.id, profile);
    #ok();
  };

  public query func getSharedProfile(id : UID) : async ?Profile {
    Map.get(sharedProfiles, Text.compare, id);
  };

  public shared(msg) func unshareProfile(id : UID) : async ApiResult {
    requireAuthenticated(msg.caller);
    switch (Map.get(sharedProfiles, Text.compare, id)) {
      case (?profile) {
        if (profile.userId != msg.caller) {
          return #err("Caller does not own this shared profile");
        };
        Map.remove(sharedProfiles, Text.compare, id);
        #ok();
      };
      case null #err("Shared profile not found");
    };
  };

  // ── Data Registry ──────────────────────────────────────────────────

  public shared(msg) func addRecord(record : Record) : async ApiResult {
    requireAuthenticated(msg.caller);
    Map.add(dataRegistry, Text.compare, record.recordId, record);
    #ok();
  };

  public query func getRecord(id : UID) : async ?Record {
    Map.get(dataRegistry, Text.compare, id);
  };

  // ── Identity ───────────────────────────────────────────────────────

  public shared query(msg) func getOwnId() : async UserId { msg.caller };
};
