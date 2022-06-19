import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
import Float "mo:base/Float";

module Types {
	public type UserId = Principal;
  public type PlatformId = Principal;
	public type UID = Text;
	public type UserName = Text;
  public type Timestamp = Int; 

  public type PersonalData = {
    #name : Text;
    #address : Text;
    #email : Text;
    #mobileNumber : Text;
  };

  public type SocialData = {
    #interests : Text;
  };

  public type FinancialData = {
    #balance : Float;
    #tokens: Text;
    #positions : Text;
  };

  public type DataCategory = {
    #personal : PersonalData;
    #social : SocialData;
    #financial : FinancialData;
  };
	
	public type User = {
		uid : UserId;
		userName : UserName;
		verified: Bool;
	};

  public type Data = {
    dataid : Nat;
    uid : UserId;
    platformid : PlatformId;
    signature : Text;
    date : Timestamp;
    dataCategory: DataCategory;
    dataType: Text;
    dataContent: Text;
  }
  // type Transaction = {};
  // type TransactionRegistry = {
  //   uid: Text;
  //   transactionId: Text;
  //   price?: Float;
  //   needRequest: Bool;
  //   verified: Bool;
  // }
  // type Profile = {

  //   registryId: Text;
  // };
  // type ProfileRegistry = {
  //   uid: Text;
  //   price?: Float;
  //   needRequest: Bool;
  //   verified: Bool;
  // }
}


// profiles = [
// {
//   name: "MARK",
//   age: 31,
//   registryId: 1
// },{
//   name: "MARK",
//   age: 20,
//   registryId: 2
// },
// {
//   name: "MEK",
//   age: 35,
//   registryId: 3
// }
// ]

// registries = [
// {id: 1,
// price: 1000,
// },
// {id: 2,
// price: 100,
// },
// {id: 3,
// }
// ]



// Query: name is MARK => found 3 => , above 30    =>  found id 1 and 3 is above 30 => return 1 and 3, (1 has price, 3 has no price) => 2 groups
