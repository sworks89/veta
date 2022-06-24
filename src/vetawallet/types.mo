import Bool "mo:base/Bool";
import Text "mo:base/Text";
import Principal "mo:base/Principal";

module {
	public type UID = Text;
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
    dataId : UID;
    uid : UserId;
    platformId : PlatformId;
    signature : Text;
    date : Timestamp;
    dataCategory: DataCategory;
    dataType: Text;
    dataContent: Text;
  };

  public type Record = {
    recordId: UID;
    userId: UserId;
    platformId : PlatformId;
    dataId : UID;
    date : Timestamp;
    signature : Text;
  };

  public type Profile = {
    id: UID;
    profileName: Text;
    isDefault: Bool;
    data: [Data];
		userId: UserId;
  };
};
