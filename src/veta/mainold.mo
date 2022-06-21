import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";

import Types "types";

shared({caller = owner}) actor class VetaWallet() {
	// type UserId = Types.UserId;
	// type KycDocument = Types.KycDocument;
	// type Data = Types.Data;

	// var vetaWalletDB: VetaWalletDB.VetaWalletDB = VetaWalletDB.VetaWalletDB();
	

	public func healthcheck(): async Bool { true };

	// public shared({caller}) func initPersonalInformation(): async () {
	// 	assert (owner == caller);
	// 	vetaWalletDB.initPersonalInformation(caller)
	// };


  // public shared({caller}) func getUserPersonalInformation(): async ?Data {
	// 	assert (owner == caller);
  //   vetaWalletDB.getPersonalInformation();
  // };

}


