import Bool "mo:base/Bool";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import List "mo:base/List";
import Map "mo:base/HashMap";
import Text "mo:base/Text";

import Types "types";
import UserDB "userDb";
import Utils "utils";

actor VetaCenter {
	
	type UID = Types.UID;
	type User = Types.User;
	type UserId = Types.UserId;

	var userDB: UserDB.UserDB = UserDB.UserDB();
 
  // Healthcheck
  public func healthcheck(): async Text { "Vetacenter canister is healthy" };

	////////////////////////////////////////////////////
	// User functions
	// Register new user after logged in
	public func registerUser(userId: UserId): async () {
		userDB.register(userId);
	};

  public func verifyUser(userId: UserId): async () {
		userDB.verify(userId);
	};

	public func getUserVerificationStatus(userId: UserId): async Bool {
		let user = userDB.getUser(userId);
		switch (user) {
			case (?user) { 
				user.verified;
			 };
			case (null) {
				throw Error.reject("User Not Found")
			};
		};
	};
	// User functions
	////////////////////////////////////////////////////

};
