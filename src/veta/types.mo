import Principal "mo:base/Principal";
import Text "mo:base/Text";

module Types {
	public type UserId = Principal;
	public type UID = Text;
	public type UserName = Text;

	
	public type User = {
		uid : UserId;
		userName : UserName;
		verified: Bool;
	};
}
