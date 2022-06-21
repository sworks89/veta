import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";

import Types "./types";

module {
  type UserId = Types.UserId;
	type PlatformId = Types.PlatformId;
	type PersonalInfo = Types.PersonalInfo;

  public class VetaWalletDB() {

    // func isEq(x: UserId, y: UserId): Bool { x == y };

    // let db = HashMap.HashMap<UserId, PersonalInfo>(1, isEq, Principal.hash);


		// public func initPersonalInformation(userId : UserId) : PersonalInfo {
		// 	let info: PersonalInfo = createDefaultPersonalData();
		// 	db.put(userId, info);   
		// 	info;
		// };

    // public func getPersonalInformation (userId: UserId) : ?PersonalInfo {
    //   db.get(userId);
    // };


    // // Helpers.
		// func createDefaultPersonalData(): PersonalInfo { 
		// 	let personal : PersonalInfo = {
		// 			name = "New User";
		// 			address = "";
		// 			email = "";
		// 			mobileNumber = "";
		// 			dob = "";
		// 		};
		// 	personal;
    // };

  }
}
