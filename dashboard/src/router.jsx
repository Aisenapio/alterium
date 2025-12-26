import { BrowserRouter, Routes, Route } from "react-router";

import LoginPage from "@/pages/auth/login";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import RegisterPage from "@/pages/auth/register";

import UnauthorizedErrorPage from "@/pages/errors/401";
import ForbiddenErrorPage from "@/pages/errors/403";
import NotFoundErrorPage from "@/pages/errors/404";
import MaintenanceErrorPage from "@/pages/errors/503";

import Dashboard1Page from "@/pages/main/dashboard-1";
import Dashboard2Page from "@/pages/main/dashboard-2";
import Dashboard3Page from "@/pages/main/dashboard-3";

import DashboardLayout from "@/pages/main/layout";

import TasksPage from "@/pages/main/tasks";
import TaskDetailPage from "@/pages/main/tasks/id";
import TasksLayout from "@/pages/main/tasks/layout";

import UsersPage from "@/pages/main/users";
import UserDetailPage from "@/pages/main/users/id";
import UsersLayout from "@/pages/main/users/layout";

import SubscribersPage from "@/pages/main/subscribers";
import SubscriberDetailPage from "@/pages/main/subscribers/id";

import ProductsPage from "@/pages/main/products";
import ProductDetailPage from "@/pages/main/products/id";
import NewProductPage from "@/pages/main/products/new";

import SettingsGeneralPage from "@/pages/main/settings";
import SettingsProfilePage from "@/pages/main/settings/profile";
import SettingsBillingPage from "@/pages/main/settings/billing";
import SettingsPlansPage from "@/pages/main/settings/plans";
import SettingsConnectedAppsPage from "@/pages/main/settings/connected-apps";
import SettingsNotificationsPage from "@/pages/main/settings/notifications";
import SettingsLayout from "@/pages/main/settings/layout";

import OverviewPage from "@/pages/main/developers/overview";
import ApiKeysPage from "./pages/main/developers/api-keys";
import WebhooksPage from "./pages/main/developers/webhooks";
import EventsAndLogsPage from "./pages/main/developers/events-&-logs";
import DevelopersLayout from "@/pages/main/developers/layout";

import RootLayout from "./layout";

import Dasboard5Page from "@/pages/main/dashboard-5";
import Dashboard6Page from "@/pages/main/dashboard-6";
import PaymentDetailPage from "@/pages/main/payments/id";
import ComponentsPage from "@/pages/main/components";
import CryptoArbitragePage from "@/pages/main/crypto-arbitrage";

import MarketPage from "@/pages/main/market";
import TechnicalPage from "@/pages/main/technical";

const Router = () => {
  return (
    <BrowserRouter basename="/dashboard">
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard1Page />} />
            <Route path="dashboard-2" element={<Dashboard2Page />} />
            <Route path="dashboard-3" element={<Dashboard3Page />} />
            <Route path="dashboard-5" element={<Dasboard5Page />} />
            <Route path="dashboard-6" element={<Dashboard6Page />} />
            <Route path="crypto-arbitrage" element={<CryptoArbitragePage />} />
            <Route path="market" element={<MarketPage />} />
            <Route path="technical" element={<TechnicalPage />} />
            <Route element={<TasksLayout />}>
              <Route path="tasks" element={<TasksPage />} />
              <Route path="tasks/:id" element={<TaskDetailPage />} />
            </Route>
            <Route element={<UsersLayout />}>
              <Route path="users" element={<UsersPage />} />
              <Route path="users/:id" element={<UserDetailPage />} />
            </Route>
            <Route path="subscribers" element={<SubscribersPage />} />
            <Route path="subscribers/:id" element={<SubscriberDetailPage />} />
            <Route path="components" element={<ComponentsPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/new" element={<NewProductPage />} />
            <Route path="products/:id" element={<ProductDetailPage />} />
            <Route path="payments/:id" element={<PaymentDetailPage />} />
            <Route path="settings" element={<SettingsLayout />}>
              <Route index element={<SettingsGeneralPage />} />
              <Route path="profile" element={<SettingsProfilePage />} />
              <Route path="billing" element={<SettingsBillingPage />} />
              <Route path="plans" element={<SettingsPlansPage />} />
              <Route
                path="connected-apps"
                element={<SettingsConnectedAppsPage />}
              />
              <Route
                path="notifications"
                element={<SettingsNotificationsPage />}
              />
            </Route>
            <Route path="developers" element={<DevelopersLayout />}>
              <Route path="overview" element={<OverviewPage />} />
              <Route path="api-keys" element={<ApiKeysPage />} />
              <Route path="webhooks" element={<WebhooksPage />} />
              <Route path="events-&-logs" element={<EventsAndLogsPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="401" element={<UnauthorizedErrorPage />} />
        <Route path="403" element={<ForbiddenErrorPage />} />
        <Route path="404" element={<NotFoundErrorPage />} />
        <Route path="503" element={<MaintenanceErrorPage />} />
        <Route path="*" element={<NotFoundErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
