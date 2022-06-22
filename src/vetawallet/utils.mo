import Array "mo:base/Array";
import Option "mo:base/Option";
import Database "./database";
import Types "./types";

module {
  type NewProfile = Types.NewProfile;
  type Profile = Types.Profile;
  type NewUserData = Types.NewUserData;
  type UserData = Types.UserData;
  type UserId = Types.UserId;

  // Profiles
  public func getProfile(directory: Database.Directory, userId: UserId): Profile {
    let existing = directory.findOne(userId);
    switch (existing) {
      case (?existing) { existing };
      case (null) {
        {
          id = userId;
          profileName = "";
          isDefault = false;
          data = [];
        }
      };
    };
  };

  public func getUserData(directory: Database.Directory, userId: UserId): UserData {
    let existing = directory.findUser(userId);
    switch (existing) {
      case (?existing) { existing };
      case (null) {
        {
          id = userId;
          verified = false;
          name = "";
          profiles = [];
          data = [];
        }
      };
    };
  };

  // Connections

  public func includes(x: UserId, xs: [UserId]): Bool {
    func isX(y: UserId): Bool { x == y };
    switch (Array.find<UserId>(xs, isX)) {
      case (null) { false };
      case (_) { true };
    };
  };

  // Authorization

  let adminIds: [UserId] = [];

  public func isAdmin(userId: UserId): Bool {
    func identity(x: UserId): Bool { x == userId };
    Option.isSome(Array.find<UserId>(adminIds,identity))
  };

  public func hasAccess(userId: UserId, userData: UserData): Bool {
    userId == userData.id or isAdmin(userId)
  };
};
