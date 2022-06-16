import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Types "./types";

module {
  type UserId = Types.UserId;
  type User = Types.User;

  public class UserDB() {
    func isEq(x: UserId, y: UserId): Bool { x == y };

    let db = HashMap.HashMap<UserId, User>(1, isEq, Principal.hash);

    // public func create(userId: UserId, username: Text) :  User {
    //   let maybeUser = db.get(userId);
    //   if (Option.isSome(maybeUser)) {
    //     return Option.unwrap(maybeUser)
    //   };
    //   let user = makeUser(userId, username);
    //   db.put(userId, user);
    //   return user;
    // };

    public func register(user: User) {
      db.put(user.uid, createUser(user));
    };

    public func update(user: User) {
      let userId: UserId = user.uid;
      db.put(userId, user);
    };

    public func findById(userId: UserId): ?User {
      db.get(userId)
    };

    public func verify(uid: UserId) {
			// let user = getUser(uid);
			// if(user){
			// 	user.verified := true;
      // 	hashMap.put(uid, user);
			// }
    };

    // public func findByName(username: Text): [User] {
    //   var users: [User] = [];
    //   for ((id, user) in db.entries()) {
    //     if (user.userName == username) {
    //       users := Array.append<User>(users, [user]);
    //     };
    //   };
    //   users
    // };

    // Helpers.
    func createUser(user: User): User {
      {
				uid = user.uid;
        userName = user.userName;
        verified = false;
      }
    };

  }
}
