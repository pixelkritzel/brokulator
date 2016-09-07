/**
 * Calculates the difference of two moment objects in months as required in the logic of brokulator
 *
 * @param {moment} startDate The moment object of the startDate
 * @param {moment} endDate The moment object of the endtDate
 * @return {Integer} The difference of the two months
 */

function calculateMonthDiff(startDate, endDate) {
    var months;
    months = (endDate.year() - startDate.year()) * 12;
    months -= startDate.month();
    months += endDate.month();
    return months <= 0 ? 0 : months;
}

export default calculateMonthDiff;