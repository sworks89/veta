import { IconDashboard, IconBrandChrome, IconHelp, IconSocial, IconWallet, IconUser, IconQrcode, IconActivity } from '@tabler/icons';
 

const dashboard = {
	id: 'dashboard',
	title: 'Veta Identity',
	type: 'group',
	children: [
		{
			id: 'default',
			title: 'Dashboard',
			type: 'item',
			url: 'dashboard',
			icon: IconDashboard,
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
			id: 'wallet',
			title: 'Wallet',
			type: 'item',
			url: 'dashboard/wallet',
			icon: IconWallet,
			breadcrumbs: false,
		},
		{
			id: 'qrcode',
			title: 'QR Code',
			type: 'item',
			url: 'dashboard/qrcode',
			icon: IconQrcode,
			breadcrumbs: false,
		},
	],
};
const platforms = {
	id: 'platforms',
	title: 'Platforms',
	type: 'group',
	children: [
		{
			id: 'cryppo',
			title: 'Cryppo',
			type: 'item',
			url: 'dashboard/platforms/cryppo',
			icon: IconActivity,
			breadcrumbs: false,
		},
		{
			id: 'socialnetwork',
			title: 'Social Network',
			type: 'item',
			url: 'dashboard/platforms/socialnetwork',
			icon: IconSocial,
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
	items: [dashboard, platforms, help],
};

export default menuItems;
