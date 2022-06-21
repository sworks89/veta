import Float "mo:base/Float";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

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
    #balance: Float;
    #tokens: Text;
    #positions : Text;
  };

  public type DataCategory = {
    #personal;
    #social;
    #financial;
  };
 
	// public type Data = {
	// 	#personal;
  //   #social;
  //   #financial;
	// 	#cryppo;
	// 	#socialnetwork;
	// }


  public type Data = {
    id : Text;
    userId : UserId;
    platformId : PlatformId;
    dataCategory: DataCategory;
    dataType: Text;
    dataContent: Text;
    date : Timestamp;
		signature: Text;
  };



	public type PersonalInfo = {
		name : Text;
		address : Text;
		email : Text;
		mobileNumber : Text;
		dob: Text;
		photo: Text;
	};

	public type Profile = {
		username: Text;
		isPrimary: Bool;
		profileName : Text;
		address : Text;
		email : Text;
		mobileNumber : Text;
		dob: Text;
		photo: Text; 
	};

	public type Hobby = {
		name: Text;
		sumary: Text;
	};

	public type QrCode = {
		id: UID;
		value : Text;
	};
  
}
