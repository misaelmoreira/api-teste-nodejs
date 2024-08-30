const compareDates = (date1: string, date2: string): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const month1 = d1.getUTCMonth(); 
    const month2 = d2.getUTCMonth();

    const year1 = d1.getUTCFullYear(); 
    const year2 = d2.getUTCFullYear();

    return month1 === month2 && year1 === year2;
}

export default compareDates