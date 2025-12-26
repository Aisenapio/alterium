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
    avatar: "/avatars/ausrobdev-avatar.png",
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
      ],
    },
  ],
};
