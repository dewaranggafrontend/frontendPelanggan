import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const customerItems = [
  {
    name: 'Customer',
    // Icon: ReceiptLongIcon,
    Icon: 'ri-group-fill',
    link: '/customer/profilecustomer',
    selectID: '2',
    items: [
      {
        name: 'Customer',
        link: '/customer/profilecustomer',
      },
      {
        name: 'Order',
        link: '/customer/order',
      },
    ],
  },
];

export { customerItems };
