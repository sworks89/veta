import Debug "mo:base/Debug";
import Error "mo:base/Error";
import List "mo:base/List";
import Map "mo:base/HashMap";
import Text "mo:base/Text";

import Database "database";
import Types "types";

shared({caller = owner}) actor class Cryppo() {
	
	// type Symbol = Types.Symbol;
	type UID = Types.UID;
	type Portfolio = Types.Portfolio;
	type Portfolios = Types.Portfolios;
	type Transaction = Types.Transaction;
	type Transactions = Types.Transactions;
	
	var portfolioDb: Database.PortfolioDB = Database.PortfolioDB();
	var transactionDb: Database.TransactionDB = Database.TransactionDB();
 

  // Healthcheck
  public shared({caller}) func healthcheck(): async Text {
		assert (owner == caller);
 		"Portfolio is healthy";
	};

  public  shared query({caller})func getPortfolios(): async Portfolios {
		assert (owner == caller);
		portfolioDb.getAll();
  };

  public shared query({caller}) func getPortfolio(portfolioId: UID): async Portfolio {
		assert (owner == caller);
		let existing = portfolioDb.getById(portfolioId);
		switch (existing) {
			case (?existing) { existing };
			case (null) {
				{
					id = "";
					name = "";
					isDefault = false;
					exchange = "";
				}
			};
		};
  };

	public shared({caller}) func createPortfolio(portfolio: Portfolio): async () {
		assert (owner == caller);
		portfolioDb.create(portfolio);
	};

  public shared({caller}) func updatePortfolio(portfolio: Portfolio): async () {
		assert (owner == caller);
		portfolioDb.update(portfolio);
  };

	public shared({caller}) func deletePortfolio(portfolioId: UID): async () {
    assert (owner == caller);
		portfolioDb.delete(portfolioId);
  };
	

	/* Get all transactions */
	public shared({caller}) func getPortfolioTransactions(portfolioId: Types.UID) : async Transactions {
		assert (owner == caller);
		transactionDb.getAllByPortfolioId(portfolioId);
	};
	
	public shared({caller}) func getTransactions() : async Transactions {
		assert (owner == caller);
		transactionDb.getAll();
	};
 /* Add Transaction */
	public shared({caller}) func addTransaction (transaction: Transaction): async () {
		assert (owner == caller);
		transactionDb.create(transaction);
	};

	/* Update/Edit Transaction */
	public shared({caller}) func updateTransaction (transaction: Transaction): async () {
		assert (owner == caller);
  	transactionDb.update(transaction);
	};

	/* Delete Transaction */
	public shared({caller}) func deleteTransaction (transactionId: UID): async () {
		assert (owner == caller);
  	transactionDb.delete(transactionId);
	};
};
