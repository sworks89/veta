import Float "mo:base/Float";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

module Types {
	public type PersonalInfo = {
		name : Text;
		address : Text;
		email : Text;
		mobileNumber : Text;
		dob : Text;
		photo : Text;
	};

	public type SocialData = {
		interests : [Text];
		nickName : Text;
		following : [Principal];
		follower : [Principal];
		post : [Post];
	};

	public type Post = {
		title : Text;
		content : Text;
		tag : [Text];
	};

	public type UserData = {
		personalInfo : PersonalInfo;
		socialData : SocialData;
	};

	public type UserId = Principal;
  public type PlatformId = Principal;
	public type UID = Text;
	public type UserName = Text;
  public type Timestamp = Int; 

  public type DataRegistry = {
    id : Text;
    userId : UserId;
    platformId : PlatformId;
    signature: Text;
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
  };

  // public type PersonalData = {
  //   #name : Text;
  //   #address : Text;
  //   #email : Text;
  //   #mobileNumber : Text;
  // };

  // public type SocialData = {
  //   #interests : Text;
  // };

  // public type FinancialData = {
  //   #balance: Float;
  //   #tokens: Text;
  //   #positions : Text;
  // };

  public type DataCategory = {
    #personal;
    #social;
    #financial;
  };
 
  // public type KycDocument = {
  //   uid: UID;
  //   name: Text;
  //   dob: Text;
  // };

  // public type Data = {
  //   id : Text;
  //   userId : UserId;
  //   platformId : PlatformId;
  //   dataCategory: DataCategory;
  //   dataType: Text;
  //   dataContent: Text;
  //   date : Timestamp;
	// 	signature: Text;
  // };
}
