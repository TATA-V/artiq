// import { SessionProvider } from "next-auth/react"
// import { ComponentType } from 'react'

// interface Props {
//   Component: ComponentType<any>;
//   pageProps: {
//     session: any;
//     [key: string]: any;
//   };
// }

// export default function Home({ Component, pageProps: { session, ...pageProps } } : Props) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   )
// }

export default function Home() {
  return (
    <div>
      main page
    </div>
  )
}