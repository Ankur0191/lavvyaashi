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
      { label: "Customers", href: "/admin/customers", icon: Users },
      { label: "Collections", href: "/admin/collections", icon: Grid },
    ],
  },
  {
    category: "Growth",
    items: [
      { label: "Marketing", href: "/admin/marketing", icon: Megaphone },
      { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
      { label: "Coupons", href: "/admin/coupons", icon: Ticket },
    ],
  },
  {
    category: "Operations",
    items: [
      { label: "Inventory", href: "/admin/inventory", icon: Boxes },
      { label: "Reviews", href: "/admin/reviews", icon: MessageSquare },
      { label: "Support", href: "/admin/support", icon: LifeBuoy },
    ],
  },
  {
    category: "Content",
    items: [
      { label: "Content", href: "/admin/content", icon: FileText },
      { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    ],
  },
  {
    category: "System",
    items: [
      { label: "Settings", href: "/admin/settings", icon: Settings },
      { label: "Audit Logs", href: "/admin/audit", icon: ShieldAlert },
    ],
  },
];
