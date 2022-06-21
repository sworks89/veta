import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

import Types "types";

module {

	type UserId = Types.UserId;
	type UID = Types.UID;

	func isEq(x: UID, y: UID): Bool { x == y };

  public class VetaCenterDB() {

    // The "database" is just a local hash map
    // let hashMap = HashMap.HashMap<UID, Portfolio>(1, isEq, Text.hash);

    // public func create(data: Portfolio) {
    //   hashMap.put(data.id, createPortfolio(data));
    // };

    // public func update(data: Portfolio) {
    //   hashMap.put(data.id, data);
    // };
		
		// public func delete(id: UID) {
    //   hashMap.delete(id);
    // };

    // public func getAll(): [Portfolio]{
		// 	var portfolios = List.nil<Portfolio>();
    //   for ((id, portfolio) in hashMap.entries()) {       
		// 			portfolios := List.push(portfolio, portfolios);    
    //   };
    //   List.toArray(portfolios);
		// 	// Iter.toArray<(UID, Portfolio)>(hashMap.entries());
		// 	// List.toArray(hashMap.entries());
		// 	// hashMap.entries()
		// };

		// public func getById(id: UID): ?Portfolio {
    //   hashMap.get(id);
    // };
 

    // // Helpers
    // func createPortfolio(data: Portfolio): Portfolio {
    //   {
    //     id = data.id;
    //     name = data.name;
    //     isDefault = data.isDefault;
    //     exchange = data.exchange;
    //   }
    // };

    
	};

}