import Map "mo:base/HashMap";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

module Types {
	public type UserId = Principal;
	public type UID = Text;
	public type Name = Text;
	public type Symbol = Text;
	public type Price = Float;

	public type Portfolios = [Portfolio];
	public type Portfolio = {
		id : UID;
		name : Name;
		isDefault : Bool;
		exchange: Text;
	};
	public type Transactions = [Transaction];
	public type Transaction = {
		id : UID;
		portfolioId: UID;
		name : Name;
		symbol : Symbol;
		logo : Text;
		price : Price;
		quantity : Float;
		fee : Price;
		transactionType: Text;
		notes : Text;
		createdAt: Text;
	};
}