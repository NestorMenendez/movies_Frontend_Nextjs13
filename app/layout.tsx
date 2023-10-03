import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import './globals.css'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
// import AuthProvider from './components/authProvider/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movies Dir',
  description: 'Your movies directory to ',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <UserProvider>

          <div className='globalGrid'>
            <Header></Header>
            {/* <AuthProvider> */}
            {children}
            {/* </AuthProvider> */}
            <Footer></Footer>
          </div>

        </UserProvider>
      </body>
    </html>
  )
}
