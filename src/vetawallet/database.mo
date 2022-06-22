import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Types "./types";

module {
  type NewProfile = Types.NewProfile;
  type Profile = Types.Profile;
  type NewUserData = Types.NewUserData;
  type UserData = Types.UserData;
  type UserId = Types.UserId;

  public class Directory() {
    // The "database" is just a local hash map
    let hashMap = HashMap.HashMap<UserId, Profile>(1, isEq, Principal.hash);
    let userDB = HashMap.HashMap<UserId, UserData>(1, isEq, Principal.hash);

    public func createOne(userId: UserId, profile: NewProfile) {
      hashMap.put(userId, makeProfile(userId, profile));
    };

    public func createUser(userId: UserId, userData: UserData) {
      userDB.put(userId, makeUser(userId, userData));
    };

    public func updateOne(userId: UserId, profile: Profile) {
      hashMap.put(userId, profile);
    };

    public func updateUser(userId: UserId, userData: UserData) {
      userDB.put(userId, userData);
    };

    public func findOne(userId: UserId): ?Profile {
      hashMap.get(userId)
    };

    public func findUser(userId: UserId): ?UserData {
      userDB.get(userId)
    };

    // public func findMany(userIds: [UserId]): [Profile] {
    //   func getProfile(userId: UserId): Profile {
    //     Option.unwrap<Profile>(hashMap.get(userId))
    //   };
    //   Array.map<UserId, Profile>(userIds, getProfile)
    // };

    // public func findBy(term: Text): [Profile] {
    //   var profiles: [Profile] = [];
    //   for ((id, profile) in hashMap.entries()) {
    //     let fullName = profile.firstName # " " # profile.lastName;
    //     if (includesText(fullName, term)) {
    //       // profiles := Array.append<Profile>(profiles, [profile]);
    //       let b1 = Buffer.Buffer<Profile>(profiles.size());
    //       for (entry in profiles.vals()) {
    //         b1.add(entry);
    //       };
    //       let b2 = Buffer.Buffer<Profile>([profile].size());
    //       for (entry in [profile].vals()) {
    //         b2.add(entry);
    //       };
    //       profiles := b1.append(b2).toArray();
    //     };
    //   };
    //   profiles
    // };

    // Helpers

    func makeProfile(userId: UserId, profile: NewProfile): Profile {
      {
        id = userId;
        profileName =  profile.profileName;
        isDefault = profile.isDefault;
        data = profile.data;
      }
    };

    func makeUser(userId: UserId, userData: NewUserData): UserData {
      {
        id = userId;
		    verified = false;
        name = userData.name;
        profiles = userData.profiles;
        data = userData.data;
      }
    };

    // func includesText(string: Text, term: Text): Bool {
    //   let stringArray = Iter.toArray<Char>(string.chars());
    //   let termArray = Iter.toArray<Char>(term.chars());

    //   var i = 0;
    //   var j = 0;

    //   while (i < stringArray.size() and j < termArray.size()) {
    //     if (stringArray[i] == termArray[j]) {
    //       i += 1;
    //       j += 1;
    //       if (j == termArray.size()) { return true; }
    //     } else {
    //       i += 1;
    //       j := 0;
    //     }
    //   };
    //   false
    // };
  };

  func isEq(x: UserId, y: UserId): Bool { x == y };
};
