
class DateFormatter {
    static days(date1, date2) {
        return Math.ceil(
            Math.abs(new Date(date1) - new Date(date2))
            / (1000 * 60 * 60 * 24)
        ) + 1;
    }

    static toText(date) {
        if (!date) {
            return '-';
        }
        const dateParts = date.split('-');
        return parseInt(dateParts[2]) + ' de ' + [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
        ][parseInt(dateParts[1]) - 1];
    }

    static toFullText(date) {
        if (!date) {
            return '-';
        }
        return DateFormatter.toText(date) +' de '+ date.substring(0, 4);
    }
}

export default DateFormatter;
