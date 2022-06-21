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

    public func register(userId: UserId) {
      db.put(userId, createUser(userId));
    };

    public func verify(uid: UserId) {
			let user = getUser(uid);
			// if(user){
			// 	user.verified := true;
      // 	db.put(uid, user);
			// }
    };

  	public func getUser(uid: UserId): ?User {
      db.get(uid)
    };

		
    // Helpers.
    func createUser(userId: UserId): User {
      {
				uid = userId;
        verified = false;
      }
    };

  }
}

