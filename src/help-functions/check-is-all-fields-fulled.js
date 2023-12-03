export const checkIsAllFieldsFulled = (...fields) => {
	return fields.every((field) => field !== null)
}
