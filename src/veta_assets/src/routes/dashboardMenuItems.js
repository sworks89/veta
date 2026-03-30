import { IconDashboard, IconHelp, IconUser, IconQrcode, IconDatabase } from '@tabler/icons';

const dashboard = {
	id: 'root',
	title: 'Veta Identity',
	type: 'group',
	children: [
		{
			id: 'dashboard',
			title: 'Dashboard',
			type: 'item',
			url: 'dashboard',
			icon: IconDashboard,
			breadcrumbs: false,
		},
		{
			id: 'datacenter',
			title: 'Data Center',
			type: 'item',
			url: 'dashboard/center',
			icon: IconDatabase,
			breadcrumbs: false,
		},
		{
			id: 'profiles',
			title: 'Profiles',
			type: 'item',
			url: 'dashboard/profiles',
			icon: IconUser,
			breadcrumbs: false,
		},
		{
			id: 'qrcode',
			title: 'QR Codes',
			type: 'item',
			url: 'dashboard/qrcode',
			icon: IconQrcode,
			breadcrumbs: false,
		},
	],
};

const help = {
	id: 'help',
	title: 'Support',
	type: 'group',
	children: [
		{
			id: 'document',
			title: 'Help',
			type: 'item',
			url: 'dashboard/help',
			icon: IconHelp,
			breadcrumbs: false,
		},
	],
};

const menuItems = {
	items: [dashboard, help],
};

export default menuItems;
