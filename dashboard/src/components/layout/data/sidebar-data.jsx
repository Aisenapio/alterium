import {
  IconApps,
  IconChecklist,
  IconCode,
  IconCoin,
  IconLayoutDashboard,
  IconNotification,
  IconPackage,
  IconSettings,
  IconTool,
  IconUser,
  IconUsers,
  IconTrendingUp,
  IconInfoCircle,
  IconChartBar,
} from "@tabler/icons-react";
import { AudioWaveform, GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

export const sidebarData = {
  user: {
    name: "Администратор",
    email: "admin@alterium.io",
    avatar: "/dashboard/avatars/ausrobdev-avatar.png",
  },
  teams: [
    {
      name: "Alterium",
      logo: ({ className }) => (
        <Logo className={className} />
      ),
      plan: "Enterprise",
    },
  ],
  navGroups: [
    {
      title: "Основное",
      items: [
        {
          title: "Аналитика",
          url: "/analytics",
          icon: IconTrendingUp,
        },
      ],
    },
    {
      title: "Крипто Арбитраж",
      items: [
        {
          title: "Панель управления",
          url: "/",
          icon: IconLayoutDashboard,
        },
        {
          title: "Управление ботом",
          url: "/crypto-arbitrage",
          icon: IconCoin,
        },
        {
          title: "Рынок",
          url: "/market",
          icon: IconChartBar,
        },
        {
          title: "Подписчики",
          url: "/subscribers",
          icon: IconUsers,
        },
        {
          title: "Продукты",
          url: "/products",
          icon: IconPackage,
        },
        {
          title: "Компоненты",
          url: "/components",
          icon: IconApps,
        },
      ],
    },
    {
      title: "Прочее",
      items: [
        {
          title: "Настройки",
          icon: IconSettings,
          items: [
            {
              title: "Общие",
              icon: IconTool,
              url: "/settings",
            },
            {
              title: "Профиль",
              icon: IconUser,
              url: "/settings/profile",
            },
            {
              title: "Оплата",
              icon: IconCoin,
              url: "/settings/billing",
            },
          ],
        },
        {
          title: "Справка",
          icon: IconInfoCircle,
          url: "/help",
        },
      ],
    },
  ],
};
