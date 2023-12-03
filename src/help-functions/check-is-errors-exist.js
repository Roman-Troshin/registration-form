export const checkIsErrorsExist = (...errors) => {
	return errors.some((error) => error !== null)
};
