    export const calculate = (form) => {
        const shippingDate = new Date(form.orderDate);
        const shippingDay = shippingDate.getDay()

        let addDayCount = 0;

        if (form.fabricType == "cotton" && form.quantity < 50) {
            addDayCount = 2
        } else if (form.fabricType == "cotton" && form.quantity >= 50) {
            addDayCount = 3
        } else if (form.fabricType == "linen" && form.quantity < 50) {
            addDayCount = 4
        } else if (form.fabricType == "linen" && form.quantity >= 50) {
            addDayCount = 5
        }

        shippingDate.setDate(shippingDate.getDate() + addDayCount)

        if (shippingDay + addDayCount > 5) {
            shippingDate.setDate(shippingDate.getDate() + 2);
        }
        return shippingDate;
    }
