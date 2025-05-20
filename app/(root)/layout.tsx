import Header from "@/components/root/Header";
import SideBar from "@/components/root/SideBar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-full w-full flex-1 overflow-hidden">
      <SideBar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="periskope-scrollbar flex w-full flex-1 flex-col bg-gray-50">
          {children}
        </main>

      </main>
    </div>
  );
}
