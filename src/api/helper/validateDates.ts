const isValidDateTimeFormat = (dateTimeString: string): boolean => {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[\+-]\d{2}:\d{2})$/;
    return iso8601Regex.test(dateTimeString);
}

const isValidDateTime = (dateTimeString: string): boolean => {
    if (!isValidDateTimeFormat(dateTimeString)) {
        return false;
    }

    const date = new Date(dateTimeString);
    return !isNaN(date.getTime());
}

export default isValidDateTime