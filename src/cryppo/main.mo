import Debug "mo:base/Debug";
import Error "mo:base/Error";
import List "mo:base/List";
import Map "mo:base/HashMap";
import Text "mo:base/Text";

import Database "database";
import Types "types";

actor Portfolio {
	
	// type Symbol = Types.Symbol;
	type UID = Types.UID;
	type Portfolio = Types.Portfolio;
	type Portfolios = Types.Portfolios;
	type Transaction = Types.Transaction;
	type Transactions = Types.Transactions;

	var portfolioDb: Database.PortfolioDB = Database.PortfolioDB();
	var transactionDb: Database.TransactionDB = Database.TransactionDB();
 

  // Healthcheck
  public func healthcheck(): async Text { "Portfolio is healthy" };

  public query func getPortfolios(): async Portfolios {
		portfolioDb.getAll();
  };

  public query func getPortfolio(portfolioId: UID): async Portfolio {
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

	public func createPortfolio(portfolio: Portfolio): async () {
			portfolioDb.create(portfolio);
		};

  public func updatePortfolio(portfolio: Portfolio): async () {
    // if(Utils.hasAccess(msg.caller, profile)) {
		portfolioDb.update(portfolio);
    // };
  };

	public func deletePortfolio(portfolioId: UID): async () {
    // if(Utils.hasAccess(msg.caller, profile)) {
      portfolioDb.delete(portfolioId);
    // };
  };
	

	/* Get all transactions */
	public func getPortfolioTransactions(portfolioId: Types.UID) : async Transactions {
		transactionDb.getAllByPortfolioId(portfolioId);
	};
	
	public func getTransactions() : async Transactions {
		transactionDb.getAll();
	};
 /* Add Transaction */
	public func addTransaction (transaction: Transaction): async () {
		transactionDb.create(transaction);
	};

	/* Update/Edit Transaction */
	public func updateTransaction (transaction: Transaction): async () {
  	transactionDb.update(transaction);
	};

	/* Delete Transaction */
	public func deleteTransaction (transactionId: UID): async () {
  	transactionDb.delete(transactionId);
	};
};
