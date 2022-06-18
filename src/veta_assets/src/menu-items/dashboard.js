// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
	id: 'dashboard',
	title: 'Veta',
	type: 'group',
	children: [
		{
			id: 'default',
			title: 'Dashboard',
			type: 'item',
			url: '/dashboard',
			icon: icons.IconDashboard,
			breadcrumbs: false,
		},
		{
			id: 'profiles',
			title: 'Profiles',
			type: 'item',
			url: '/dashboard/profiles',
			icon: icons.IconDashboard,
			breadcrumbs: false,
		},
		{
			id: 'default',
			title: 'Dashboard',
			type: 'item',
			url: '/dashboard',
			icon: icons.IconDashboard,
			breadcrumbs: false,
		},
		{
			id: 'default',
			title: 'Dashboard',
			type: 'item',
			url: '/dashboard',
			icon: icons.IconDashboard,
			breadcrumbs: false,
		},
		{
			id: 'default',
			title: 'Dashboard',
			type: 'item',
			url: '/dashboard',
			icon: icons.IconDashboard,
			breadcrumbs: false,
		},
	],
};

export default dashboard;
