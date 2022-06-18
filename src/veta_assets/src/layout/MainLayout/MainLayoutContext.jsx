import { useState, useEffect, useContext, useRef, createContext, FC } from 'react';
import config from '../../config';

export const MainLayoutContext = createContext({
	isOpen: [],
	opened: true,
	fontFamily: config.fontFamily,
	borderRadius: config.borderRadius,
});

export const MainLayoutProvider = (props) => {
	const { children } = props;
	const [customization, setCustomization] = useState({
		isOpen: [],
		opened: true,
		fontFamily: config.fontFamily,
		borderRadius: config.borderRadius,
	});

	const setMenuOpen = (id) => {
		setCustomization({ ...customization, isOpen: [id] });
	};
	const setMenu = (status) => {
		setCustomization({ ...customization, opened: status });
	};
	const setFontFamily = (font) => {
		setCustomization({ ...customization, fontFamily: font });
	};
	const setBorderRadius = (value) => {
		setCustomization({ ...customization, borderRadis: value });
	};

	return (
		<MainLayoutContext.Provider
			value={{
				gridSpacing: 3,
				drawerWidth: 260,
				appDrawerWidth: 320,
				setMenuOpen,
				setMenu,
				setFontFamily,
				setBorderRadius,
				customization,
			}}>
			{children}
		</MainLayoutContext.Provider>
	);
};

const useMainLayout = () => useContext(MainLayoutContext);
export default useMainLayout;
