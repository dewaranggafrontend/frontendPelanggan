import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardTemplate from '../components/DashboardTemplate';
import Login from '../views/auth/Login';
// import Bank from '../views/Bank';
import Dashboard from '../views/Dashboard';
// import Departement from '../views/Departement';
// import Positon from '../views/Position';
// import Shift from '../views/Shift';
// import Users from '../views/Users';
import * as Middleware from '../middleware/App';
// import FormUser from '../views/Users/FormUser';
// import Attendance from '../views/Attendance';
// import Overtime from '../views/Overtime';
// import Leave from '../views/Leave';
// import TimeOff from '../views/TimeOff';
// import CashAdvances from '../views/CashAdvances';
// import Reimbursement from '../views/Reimbursement';
// import Company from '../views/Company';
import UserRole from '../views/UserRole';
import JobPosition from '../views/JobPosition';
import Package from '../views/Package';
import Administration from '../views/Administration';
import AddUserRole from '../views/UserRole/AddUserRole';
import AddJobPosition from '../views/JobPosition/AddJobPosition';
import AddAdministration from '../views/Administration/AddAdministration';
import Coupon from '../views/Coupon';
import ProfileCustomer from '../views/ProfileCustomer';
import AddProfileCustomer from '../views/ProfileCustomer/AddProfileCustomer';
import Order from '../views/Order';
import OrderOld from '../views/OrderOld';
import LogUserRole from '../views/UserRole/LogUserRole';
import LogJobPosition from '../views/JobPosition/LogJobPosition';
import LogAdministration from '../views/Administration/LogAdministration';
import LogPackage from '../views/Package/LogPackage';
import LogCoupon from '../views/Coupon/LogCoupon';
import LogProfileCustomer from '../views/ProfileCustomer/LogProfileCustomer';
import LogOrder from '../views/OrderOld/LogOrder';
import Finance from '../views/Finance';
import DetailCustomer from '../views/ProfileCustomer/DetailCustomer';
import DetailOrder from '../views/OrderOld/DetailOrder';
import Setting from '../views/Setting';
import AllService from '../views/AllService';
import Billing from '../views/Billing';
import UpgradeForm from '../views/AllService/UpgradeForm';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Middleware.Guest>
              <Login />
            </Middleware.Guest>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<Dashboard />} title="Dashboard" />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/all-service"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<AllService />} title="All Service" />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/all-service/upgrade"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<UpgradeForm />} title="Upgrade" />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/order"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<Order />} title="Order" />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/billing"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<Billing />} title="Billing" />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/setting"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<Setting />} title="Setting" />
            </Middleware.Authenticated>
          }
        />

        <Route
          path="/master-data/userrole"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<UserRole />} title="User Role" />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/master-data/userrole/add"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<AddUserRole type={'add'} />}
                title="Add User Role"
              />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/master-data/userrole/log"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<LogUserRole />}
                title="Log Activity User Role"
              />
            </Middleware.Authenticated>
          }
        />
        {/* <Route
          path="/master-data/users/add"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<FormUser type={'add'} />}
                title="Add User"
              />
            </Middleware.Authenticated>
          }
        /> */}
        {/* <Route
          path="/master-data/users/edit/:id"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<FormUser type={'edit'} />}
                title="Edit User"
              />
            </Middleware.Authenticated>
          }
        /> */}

        <Route
          path="/master-data/jobposition"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<JobPosition />}
                title="Job Position"
              />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/master-data/jobposition/add"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<AddJobPosition type={'add'} />}
                title="Add Job Position"
              />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/master-data/jobposition/log"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<LogJobPosition />}
                title="Log Activity Job Position"
              />
            </Middleware.Authenticated>
          }
        />

        <Route
          path="/master-data/administration"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<Administration />}
                title="User Administration"
              />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/master-data/administration/add"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<AddAdministration type={'add'} />}
                title="Add User Administration"
              />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/master-data/administration/log"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<LogAdministration />}
                title="Log Activity User Administration"
              />
            </Middleware.Authenticated>
          }
        />

        <Route
          path="/master-data/package"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<Package />} title="Package" />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/master-data/package/log"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<LogPackage />}
                title="Log Activity Package"
              />
            </Middleware.Authenticated>
          }
        />

        <Route
          path="/master-data/coupon"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<Coupon />} title="Coupon" />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/master-data/coupon/log"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<LogCoupon />}
                title="Log Activity Coupon"
              />
            </Middleware.Authenticated>
          }
        />

        {/* <Route
          path="/master-data/shift"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<Shift />} title="Shift" />
            </Middleware.Authenticated>
          }
        /> */}

        <Route
          path="/customer/profilecustomer"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<ProfileCustomer />}
                title="Customer"
              />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/customer/profilecustomer/add"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<AddProfileCustomer type={'add'} />}
                title="Add Customer"
              />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/customer/profilecustomer/log"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<LogProfileCustomer />}
                title="Log Activity Profile Customer"
              />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/customer/profilecustomer/detail"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<DetailCustomer />}
                title="Detail Customer"
              />
            </Middleware.Authenticated>
          }
        />

        <Route
          path="/customer/order"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<OrderOld />} title="Order" />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/customer/order/log"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<LogOrder />}
                title="Log Activity Order"
              />
            </Middleware.Authenticated>
          }
        />
        <Route
          path="/customer/order/detail"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<DetailOrder />}
                title="Detail Order"
              />
            </Middleware.Authenticated>
          }
        />

        <Route
          path="/finance"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<Finance />} title="Finance" />
            </Middleware.Authenticated>
          }
        />
        {/* <Route
          path="/activity/attendance"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<Attendance />} title="Attendance" />
            </Middleware.Authenticated>
          }
        /> */}

        {/* <Route
          path="/activity/leave"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<Leave />} title="Leave" />
            </Middleware.Authenticated>
          }
        />

        <Route
          path="/activity/timeoff"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<TimeOff />} title="Time Off" />
            </Middleware.Authenticated>
          }
        />

        <Route
          path="/finance/cashadvances"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<CashAdvances />}
                title="Cash Advances"
              />
            </Middleware.Authenticated>
          }
        />

        <Route
          path="/finance/reimbursement"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate
                render={<Reimbursement />}
                title="Reimbursement"
              />
            </Middleware.Authenticated>
          }
        />

        <Route
          path="/officecenter/company"
          element={
            <Middleware.Authenticated>
              <DashboardTemplate render={<Company />} title="Company" />
            </Middleware.Authenticated>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
