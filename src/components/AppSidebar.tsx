
import React, { useState } from 'react';
import { Home, RotateCcw, Crown, MessageCircle } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useLocation, Link } from 'react-router-dom';
import { SupportModal } from '@/components/SupportModal';

const menuItems = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Restorations", 
    url: "/restorations",
    icon: RotateCcw,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  return (
    <>
      <Sidebar className="border-r">
        <SidebarHeader className="p-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-gray-900">Reminiscence</h1>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === item.url}
                    >
                      <Link to={item.url} className="flex items-center space-x-3">
                        <item.icon size={20} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setIsSupportModalOpen(true)}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <MessageCircle size={20} />
                    <span>Support</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <Button className="w-full bg-purple-600 hover:bg-purple-700">
            <Crown size={16} className="mr-2" />
            Upgrade
          </Button>
        </SidebarFooter>
      </Sidebar>

      <SupportModal 
        open={isSupportModalOpen} 
        onOpenChange={setIsSupportModalOpen} 
      />
    </>
  );
}
