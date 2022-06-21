import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import MainCard from '../../ui-component/cards/MainCard';
// project imports
import EarningCard from '../../components/EarningCard';
import PopularCard from '../../components/PopularCard';
import TotalOrderLineChartCard from '../../components/TotalOrderLineChartCard';
import TotalIncomeDarkCard from '../../components/TotalIncomeDarkCard';
import TotalIncomeLightCard from '../../components/TotalIncomeLightCard';
import TotalGrowthBarChart from '../../components/TotalGrowthBarChart';
import useMainLayout from '../../layout/MainLayout/MainLayoutContext';
import TransactionsCard from '../../components/Cryppo/TransactionsCard';
import HoldingCard from '../../components/Cryppo/HoldingCard';
import * as CryppoIcServices from '../../services/CryppoServices.ic';
import AssetsCard from '../../components/Cryppo/AssetsCard';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const CryppoPlatformPage = () => {
	const { gridSpacing, customization } = useMainLayout();
	const [isLoading, setLoading] = useState(true);
	const [transactions, setTransactions] = useState([]);

	const [portfolios, setPortfolios] = useState([]);
	const [data, setData] = useState({});

	useEffect(() => {
		fetchTransactions();
		fetchPortfolios();
		setLoading(false);
	}, []);

	const fetchPortfolios = async () => {
		const _portfolios = await CryppoIcServices.getAllPortfolios();
		setPortfolios(_portfolios);
	};

	const fetchTransactions = async () => {
		const transactions = await CryppoIcServices.getAllTransactions();

		setTransactions(transactions || []);
		let symbolsList = [];
		const assetsByTransactions = {};

		transactions.forEach((transaction) => {
			const { symbol } = transaction;
			// Existing symbol
			if (!assetsByTransactions[symbol]) {
				symbolsList.push(symbol.toUpperCase());
				assetsByTransactions[symbol] = [];
			}
			assetsByTransactions[symbol].push(transaction);
		});

		// Generate assets
		const assetsList = [];
		Object.keys(assetsByTransactions).forEach((key) => {
			const trans = assetsByTransactions[key];
			const assetItem = generateAssetData({ ...trans[0], transactions: trans });
			assetsList.push(assetItem);
		});

		// Sort symbols
		symbolsList = symbolsList.sort();

		setData({
			transactions,
			symbolsList,
			assets: assetsByTransactions,
			assetCount: symbolsList.length,
		});

		setLoading(true);
	};

	return (
		<>
			<Typography variant='h2' component='h2' sx={{ marginBottom: gridSpacing }}>
				Cryppo
			</Typography>

			<Grid container spacing={gridSpacing}>
				<Grid item xs={12} sm={6} md={8}>
					<Grid container spacing={gridSpacing}>
						<Grid item sm={4} xs={12}>
							<HoldingCard isLoading={isLoading} assets={data.assets} />
						</Grid>
						<Grid item md={4} sm={6} xs={12}>
							<HoldingCard isLoading={isLoading} assets={data.assets} />
						</Grid>
						<Grid item md={4} sm={6} xs={12}>
							<HoldingCard isLoading={isLoading} assets={data.assets} />
						</Grid>
						<Grid item xs={12}>
							<TransactionsCard
								isLoading={isLoading}
								gridSpacing={gridSpacing}
								transactions={data.transactions}
							/>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} sm={6} md={4}>
					<Grid container spacing={gridSpacing}>
						<Grid item xs={12}>
							<TotalOrderLineChartCard isLoading={isLoading} />
						</Grid>
						{/* <Grid item sm={6} xs={12} md={6} lg={12}>
						<TotalIncomeDarkCard isLoading={isLoading} />
					</Grid>
					<Grid item sm={6} xs={12} md={6} lg={12}>
						<TotalIncomeLightCard isLoading={isLoading} />
					</Grid> */}
						<Grid item xs={12}>
							<AssetsCard isLoading={isLoading} gridSpacing={gridSpacing} assets={data.assets} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};

export default CryppoPlatformPage;
