import Bool "mo:base/Bool";
import Principal "mo:base/Principal";

module {
  public type UserId = Principal;
  public type PlatformId = Principal;
  public type Timestamp = Int;

  public type DataCategory = {
    #personal;
    #social;
    #financial;
  };

  public type NewUserData = {
    name: Text;
	  verified: Bool;
    profiles: [Profile];
    data: [Data];
  };

  public type UserData = {
    id: UserId;
	  verified: Bool;
    name: Text;
    profiles: [Profile];
    data: [Data];
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

  public type NewProfile = {
    profileName: Text;
    isDefault: Bool;
    data: [Data];
  };

  public type Profile = {
    id: UserId;
    profileName: Text;
    isDefault: Bool;
    data: [Data];
  };
};
