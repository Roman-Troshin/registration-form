import { useState } from 'react';
import { initialRegistrationInfo } from "../constants/initial-registration-info";


export const useRegistrationForm = () => {
	const [registrationInfo, setRegistrationInfo] = useState(initialRegistrationInfo);

	return {
		getRegistrationInfo: () => registrationInfo,

		updateRegistrationInfo: (fieldName, newValue) => {
			setRegistrationInfo({ ...registrationInfo, [fieldName]: newValue });
		},
	};
};
