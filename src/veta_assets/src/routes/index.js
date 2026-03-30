import { useRoutes } from 'react-router-dom'; 
// routes
import DashboardRoutes from './DashboardRoutes';
import MainRoutes from './MainRoutes';
// ==============================|| ROUTING RENDER ||============================== //

export default function AppRoutes() {
	return useRoutes([MainRoutes, DashboardRoutes] );
}

