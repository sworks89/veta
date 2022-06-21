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
  type User = Types.User;
	type Data = Types.Data;
  type DataCategory = Types.DataCategory;

  public class VetaWalletDB() {


    func isEq(x: Text, y: Text): Bool { x == y };

    let db = HashMap.HashMap<Text, Data>(1, isEq, Text.hash);


		// public func initPersonalInformation(user:User) {
		// 	let newData: [Data] = createDefaultPersonalData(user);
      
    //   // for (data in newData) {       
		// 			db.put(newData[0].id, newData[0]);   
    //   // };
		// };

    // public func getPersonalInformation (id: Text) : ?Data {
    //   db.get(id);
    // };


    // Helpers.
    func createUser(user: User): User {
      {
				uid = user.uid;
        verified = false;
      }
    };

		func createDefaultPersonalData(user: User): Data {
			var personal = List.nil<Data>();
			var cat: DataCategory = #personal;
			let personal : Data = {
					id = "1";
					uid = user.uid;
					platformId = user.uid;
					signature = "123";
					date = Time.now();
					dataCategory = cat;
					dataType = "name";
					dataContent = "New User";
				};
			personal;
    };

  }
}
