import Link from 'next/link';
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className='py-4 flex gap-2'>
          <Link href={'/'} className='px-2 py-1 border bg-red-600 w-fit rounded'>home</Link>
        <Link href={'/blog'} className='px-2 py-1 border bg-red-600 w-fit rounded'>blogs</Link>
        <Link href={'/blog/author'} className='px-2 py-1 border bg-red-600 w-fit rounded'>author</Link>
        </div>
        {children}
        <p>this is footer</p>
      </body>
    </html>
  );
}
