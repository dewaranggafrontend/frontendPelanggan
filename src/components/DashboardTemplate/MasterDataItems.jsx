import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { styled } from '@mui/material/styles';

const masterDataItems = [
  {
    name: 'Master Data',
    // Icon: CollectionsBookmarkIcon,
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
];

export { masterDataItems };
