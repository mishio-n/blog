import { Footer } from '~/components/Footer'
import { Header } from '~/components/Header'
import { Category } from '~/schema'
import { Aside } from '../Aside'

type Props = {
  categories: Category[]
}

export const Layout: React.FC<Props> = ({ children, categories }) => {
  return (
    <>
      <Header />
      <div className="mx-auto mt-5 mb-0 >1024:flex >1024:justify-between >1024:w-lg md:w-md sm:mx-0 sm:py-0 sm:px-5">
        <div className="lg:w-md">{children}</div>
        <Aside categories={categories} />
      </div>
      <Footer />
    </>
  )
}
