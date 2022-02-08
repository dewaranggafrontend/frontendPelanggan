import DashboardIcon from '@mui/icons-material/Dashboard';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CampaignIcon from '@mui/icons-material/Campaign';
import WarningIcon from '@mui/icons-material/Warning';
import PieChartIcon from '@mui/icons-material/PieChart';

const appMenuItems = [
  // {
  //   name: 'All Applications',
  //   link: '/dashboard',
  //   Icon: DashboardIcon,
  // },

  {
    name: 'Master Data',
    Icon: 'ri-folder-fill',
    link: '/master-data/userrole',
    selectID: '1',
    items: [
      {
        name: 'User Role',
        link: '/master-data/userrole',
      },
      {
        name: 'Job Position',
        link: '/master-data/jobposition',
      },
      {
        name: 'User Administration',
        link: '/master-data/administration',
      },
      {
        name: 'Package',
        link: '/master-data/package',
      },
      {
        name: 'Coupon',
        link: '/master-data/coupon',
      },
    ],
  },
  {
    name: 'Customer',
    Icon: 'ri-group-fill',
    link: '/customer/profilecustomer',
    selectID: '2',
    items: [
      {
        name: 'Customer',
        link: '/customer/profilecustomer',
      },
      {
        name: 'Overtime',
        link: '/customer/overtime',
      },
    ],
  },
  // {
  //   name: 'Finance',
  //   Icon: LocalOfferIcon,
  //   items: [
  //     {
  //       name: 'Cash Advance',
  //       link: '/finance/cashadvances',
  //     },
  //     {
  //       name: 'Reimbursement',
  //       link: '/finance/reimbursement',
  //     },
  //   ],
  // },
  // {
  //   name: 'Office Center',
  //   Icon: CampaignIcon,
  //   items: [
  //     {
  //       name: 'Company',
  //       link: '/officecenter/company',
  //     },
  //     // {
  //     //   name: 'Learning Center',
  //     //   link: '/activity/learningcenter',
  //     // },
  //     // {
  //     //   name: 'Announcement',
  //     //   link: '/activity/announcement',
  //     // },
  //   ],
  // },
  // {
  //   name: 'Panic Button',
  //   Icon: WarningIcon,
  //   link: '/panicbutton',
  // },
  // {
  //   name: 'Report',
  //   Icon: PieChartIcon,
  //   link: '/report',
  // },
];

export { appMenuItems };
