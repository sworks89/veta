import { Outlet } from 'react-router-dom';

// project imports
import Customization from '../Customization';

// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {

return (
		<>
			<Outlet />
			{/* <Customization /> */}
		</>
	);
};

export default MinimalLayout;
