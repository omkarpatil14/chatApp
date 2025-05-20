export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <main className="">
        <div className="flex justify-center">{children}</div>
      </main>
    );
  }
  