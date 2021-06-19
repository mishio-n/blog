import { Footer } from '~/components/footer'
import { Header } from '~/components/header'
import { Aside } from '../aside'

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mx-auto mt-5 mb-0 >1024:flex >1024:justify-between >1024:w-lg md:w-md sm:mx-0 sm:py-0 sm:px-5">
        <div className="lg:w-md">{children}</div>
        <Aside />
      </div>
      <Footer />
    </>
  )
}
