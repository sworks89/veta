import Principal "mo:base/Principal";

module {
  public type UserId = Principal;

  public type UserData = {
    id: UserId;
    name: Text;
  };
}