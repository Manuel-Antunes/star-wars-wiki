import React from 'react'
import { Helmet } from 'react-helmet'
import ufoDark from '~/assets/images/illustrations/ufo-dark.svg'
import ufo from '~/assets/images/illustrations/ufo.svg'

const NotFound: React.FC = () => (
    <div className="dark">
      <div className="min-h-screen flex grow dark:bg-gray-900">
        <Helmet>
          <title>404 - Pagina não Encontrada</title>
        </Helmet>
        {/* Main Content Wrapper */}
        <main className="grid w-full bg-bg-404 dark:bg-bg-404-dark grow grid-cols-1 place-items-center bg-center">
          <div className="max-w-[26rem] text-center">
            <div className="w-full">
              <img className="w-full dark:hidden" id="hero-image-light" src={ufo} alt="banner" />
              <img
                className="w-full hidden dark:block"
                id="hero-image-dark"
                src={ufoDark}
                alt="banner"
              />
            </div>
            <p className="pt-4 text-7xl font-bold text-primary dark:text-accent">404</p>
            <p className="pt-4 text-xl font-semibold text-slate-800 dark:text-gray-300">
              Oops. Página Não Encontrada.
            </p>
            <p className="pt-2 text-slate-500 dark:text-gray-300">
              Essa página que você está procurando não está disponível
            </p>
            <a
              href="/"
              className="inline-flex cursor-pointer items-center justify-center rounded-lg px-5 py-2 text-center tracking-wide outline-none transition-all duration-200 focus:outline-none disabled:pointer-events-none mt-8 h-11 bg-primary text-base font-medium text-white hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/50 focus:bg-primary-dark focus:shadow-lg focus:shadow-primary/50 active:bg-primary-dark dark:bg-accent"
            >
              Voltar Para o Início
            </a>
          </div>
        </main>
      </div>
    </div>
  )

export default NotFound
