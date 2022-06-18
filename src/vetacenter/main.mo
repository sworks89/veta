import Debug "mo:base/Debug";
import Error "mo:base/Error";
import List "mo:base/List";
import Map "mo:base/HashMap";
import Text "mo:base/Text";

import Database "database";
import Types "types";
import Utils "utils";

actor VetaCenter {
	
	// type Symbol = Types.Symbol;
	type UID = Types.UID;
	type Portfolio = Types.Portfolio;
	type Transaction = Types.Transaction;

	var vetaCenterDB: Database.VetaCenterDB = Database.VetaCenterDB();
 
  // Healthcheck
  public func healthcheck(): async Text { "Vetacenter canister is healthy" };


};
