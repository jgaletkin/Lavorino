import ClientLayout from './ClientLayout'

export default function HomePage() {
  return (
    <ClientLayout>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <h1 className="text-4xl font-bold">Welcome to Lavorino</h1>
          <p className="text-xl">Find and book local service providers with ease</p>
        </div>
      </main>
    </ClientLayout>
  )
} 