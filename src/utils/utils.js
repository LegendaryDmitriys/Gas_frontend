export const splitLicensePlateNumber = (plateNumber) => {
    const regex = /^([A-Za-zА-Яа-я]{1})(\d{3})([A-Za-zА-Яа-я]{2})$/;
    const matches = plateNumber.match(regex);

    if (matches) {
        return matches.slice(1);
    } else {
        return [plateNumber];
    }
};