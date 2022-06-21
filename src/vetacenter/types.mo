import Principal "mo:base/Principal";
import Text "mo:base/Text";

module Types {
	public type UserId = Principal;
	public type PlatformId = Principal;
	public type UID = Text;
	public type Certificate = Text;

	public type User = {
		uid : UserId;
		verified: Bool;
	};

	// public type PortfolioRegistry = {
	// 	uid: UserId;
	// 	platformId: PlatformId;
	// 	certification: Certificate;
	// 	portfolioId: UID;
	// };

	// public type TransactionRegistry = {
	// 	uid: UserId;
	// 	platformId: PlatformId;
	// 	certification: Certificate;
	// 	transactionId: UID;
	// };
}