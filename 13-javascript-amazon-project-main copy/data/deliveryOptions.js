import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
  id:'1',
  deliveryDays: 7,
  deliveryPrice: 0
},{
  id: '2',
  deliveryDays: 3,
  deliveryPrice: 499
},{
  id:'3',
  deliveryDays: 1,
  deliveryPrice: 999
}]; 

export function getDelivery(deliveryOptionId) {
  let deliveryOption; 

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId ) {
      deliveryOption = option;
    }
  });

  return deliveryOption;
};

function isWeekend(date) {
  const weekendDays = date.format('dddd')
  return weekendDays === 'Saturday' || weekendDays === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate =  dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'days');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }  
    console.log(remainingDays)
  }


  const  dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

    return dateString
}



