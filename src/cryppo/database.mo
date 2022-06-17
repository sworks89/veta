import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

import Types "types";

module {
  type Name = Types.Name;
	type Portfolio = Types.Portfolio;
	type Transaction = Types.Transaction;

	type Symbol = Types.Symbol;
	type UserId = Types.UserId;
	type UID = Types.UID;

	func isEq(x: UID, y: UID): Bool { x == y };

  public class PortfolioDB() {

    // The "database" is just a local hash map
    let hashMap = HashMap.HashMap<UID, Portfolio>(1, isEq, Text.hash);

    public func create(data: Portfolio) {
      hashMap.put(data.id, createPortfolio(data));
    };

    public func update(data: Portfolio) {
      hashMap.put(data.id, data);
    };
		
		public func delete(id: UID) {
      hashMap.delete(id);
    };

    public func getAll(): [Portfolio]{
			var portfolios = List.nil<Portfolio>();
      for ((id, portfolio) in hashMap.entries()) {       
					portfolios := List.push(portfolio, portfolios);    
      };
      List.toArray(portfolios);
			// Iter.toArray<(UID, Portfolio)>(hashMap.entries());
			// List.toArray(hashMap.entries());
			// hashMap.entries()
		};

		public func getById(id: UID): ?Portfolio {
      hashMap.get(id);
    };
 

    // Helpers
    func createPortfolio(data: Portfolio): Portfolio {
      {
        id = data.id;
        name = data.name;
        isDefault = data.isDefault;
        exchange = data.exchange;
      }
    };

    
	};


  public class TransactionDB() {

    // The "database" is just a local hash map
    let hashMap = HashMap.HashMap<UID, Transaction>(1, isEq, Text.hash);

    public func create(data: Transaction) {
      hashMap.put(data.id, createTransaction(data));
    };

    public func update(data: Transaction) {
      hashMap.put(data.id, data);
    };
		
		public func delete(id: UID) {
      hashMap.delete(id);
    };

    public func getAll(): [Transaction]{
			var transactions = List.nil<Transaction>();
      for ((id, transaction) in hashMap.entries()) {       
					transactions := List.push(transaction, transactions);    
      };
      List.toArray(transactions);
		};
		
		public func getAllByPortfolioId(portfolioId: UID) : [Transaction]{
			var transactions = List.nil<Transaction>();
      for ((id, transaction) in hashMap.entries()) {  
				if(transaction.portfolioId == portfolioId){
						transactions := List.push(transaction, transactions);    
				}     
      };
      List.toArray(transactions);
		};

		public func getById(id: UID): ?Transaction {
      hashMap.get(id);
    };
 

    // Helpers
    func createTransaction(data: Transaction): Transaction {
      {
				id = data.id;
				portfolioId = data.portfolioId;
				name = data.name;
				symbol = data.symbol;
				logo = data.logo;
				price = data.price;
				quantity = data.quantity;
				fee = data.fee;
				transactionType = data.transactionType;
				notes = data.notes;
				createdAt = data.createdAt;
      }
    };

    
	};
}