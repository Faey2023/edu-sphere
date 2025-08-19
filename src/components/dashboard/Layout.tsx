import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarComponent from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarComponent />
      <main className="flex-1 min-h-screen px-10">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
