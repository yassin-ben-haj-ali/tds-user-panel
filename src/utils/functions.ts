export const formatDate = (date: string | Date | null): string => {
	if (!date) {
		return "";
	}
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	};

	// Ensure the input is a Date object
	const dateObj = typeof date === "string" ? new Date(date) : date;

	// Format the date to French locale
	return dateObj.toLocaleDateString("fr-FR", options);
};