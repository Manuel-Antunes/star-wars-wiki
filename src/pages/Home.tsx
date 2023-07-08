import React from "react";
import OnBoardingCard from "~/components/molecules/OnBoardingCard";
import MainLayout from "~/layouts/MainLayout";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="py-5 text-center lg:py-6">
        <p className="text-sm uppercase">A muito tempo, numa galáxia muito muito distante</p>
        <h3 className="mt-1 text-xl font-semibold text-slate-600 dark:text-navy-100">
          BEM VINDO A STAR WARS!
        </h3>
      </div>
      <div className="mx-auto">
        <div className="grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
          <OnBoardingCard title="Personagens" description="Descubra quem são os integrantes da trama de Star Wars, de quais filmes eles participaram e quais são os atores que os deram vida." 
          image="https://starwars-visualguide.com/assets/img/characters/1.jpg">
            <OnBoardingCard.CTA href="/characters">
              Acessar
            </OnBoardingCard.CTA>
          </OnBoardingCard>
          <OnBoardingCard title="Filmes" description="Aqui você pode encontrar informações sobre os filmes da saga Star Wars, como diretor, data de lançamento, personagens e planetas." 
          image="https://starwars-visualguide.com/assets/img/characters/2.jpg">
            <OnBoardingCard.CTA href="/movies">
              Acessar
            </OnBoardingCard.CTA>
          </OnBoardingCard>
          <OnBoardingCard title="Sobre" description="Conheça um pouco mais sobre o desenvolvedor dessa aplicação." 
          image="https://starwars-visualguide.com/assets/img/characters/3.jpg">
            <OnBoardingCard.CTA href="/sobre">
              Acessar
            </OnBoardingCard.CTA>
          </OnBoardingCard>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
