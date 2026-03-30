// import { cryppo } from '../../../declarations/cryppo';

// import {
// 	Portfolio,
// 	Portfolios,
// 	Transaction,
// 	Transactions,
// 	UID,
// } from '../../../declarations/cryppo/cryppo.did';

// export const healthcheck = async () => {
// 	// eslint-disable-next-line no-async-promise-executor
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			await cryppo.healthcheck();
// 			resolve({ status: 'healthy' });
// 		} catch (error) {
// 			console.error(error);
// 			reject(error);
// 		}
// 	});
// };

// export const getAllPortfolios = async () => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const portfolios = await cryppo.getPortfolios();
// 			resolve(portfolios as Portfolios);
// 		} catch (error) {
// 			console.error(error);
// 			reject(error);
// 		}
// 	});
// };

// export const addPortfolio = async (data: Portfolio) => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			await cryppo.createPortfolio(data);
// 			resolve(data);
// 		} catch (error) {
// 			console.error(error);
// 			reject(error);
// 		}
// 	});
// };

// export const updatePortfolio = async (data: Portfolio) => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			await cryppo.updatePortfolio(data);
// 			resolve(data);
// 		} catch (error) {
// 			console.error(error);
// 			reject(error);
// 		}
// 	});
// };

// export const deletePortfolio = async (portfolioId: UID) => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			await cryppo.deletePortfolio(portfolioId);
// 			resolve(true);
// 		} catch (error) {
// 			console.error(error);
// 			reject(error);
// 		}
// 	});
// };

// export const getTransactionsByPortfolio = async (portfolioId: UID) => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const transactions = await cryppo.getPortfolioTransactions(portfolioId);
// 			resolve(transactions as Transactions);
// 		} catch (error) {
// 			console.error(error);
// 			reject(error);
// 		}
// 	});
// };

// export const getAllTransactions = async () => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			const transactions = await cryppo.getTransactions();
// 			resolve(transactions as Transactions);
// 		} catch (error) {
// 			console.error(error);
// 			reject(error);
// 		}
// 	});
// };

// export const addTransaction = async (transaction: Transaction) => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			await cryppo.addTransaction(transaction);
// 			resolve(transaction as Transaction);
// 		} catch (error) {
// 			console.error(error);
// 			reject(error);
// 		}
// 	});
// };

// export const updateTransaction = async (transaction: Transaction) => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			await cryppo.updateTransaction(transaction);
// 			resolve(transaction);
// 		} catch (error) {
// 			console.error(error);
// 			reject(error);
// 		}
// 	});
// };

// export const deleteTransaction = async (transactionId: UID) => {
// 	return new Promise(async (resolve, reject) => {
// 		try {
// 			await cryppo.deleteTransaction(transactionId);
// 			resolve(true);
// 		} catch (error) {
// 			console.error(error);
// 			reject(error);
// 		}
// 	});
// };
