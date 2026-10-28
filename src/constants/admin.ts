import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Grid,
  Megaphone,
  BarChart3,
  Boxes,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  Ticket,
  Bot,
  LifeBuoy,
  Settings,
  ShieldAlert,
} from "lucide-react";

export const ADMIN_SIDEBAR_LINKS = [
  {
    category: "Main",
    items: [
      { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { label: "Products", href: "/admin/products", icon: Package },
      { label: "Customers", href: "/admin/customers", icon: Users, comingSoon: true },
      { label: "Collections", href: "/admin/collections", icon: Grid, comingSoon: true },
    ],
  },
  {
    category: "Growth",
    items: [
      { label: "Marketing", href: "/admin/marketing", icon: Megaphone, comingSoon: true },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3, comingSoon: true },
      { label: "Coupons", href: "/admin/coupons", icon: Ticket },
    ],
  },
  {
    category: "Operations",
    items: [
      { label: "Inventory", href: "/admin/inventory", icon: Boxes, comingSoon: true },
      { label: "Reviews", href: "/admin/reviews", icon: MessageSquare, comingSoon: true },
      { label: "Support", href: "/admin/support", icon: LifeBuoy, comingSoon: true },
    ],
  },
  {
    category: "Content",
    items: [
      { label: "Content", href: "/admin/content", icon: FileText, comingSoon: true },
      { label: "Media Library", href: "/admin/media", icon: ImageIcon, comingSoon: true },
    ],
  },
  {
    category: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings, comingSoon: true },
      { label: "Audit Logs", href: "/admin/audit", icon: ShieldAlert, comingSoon: true },
    ],
  },
];
