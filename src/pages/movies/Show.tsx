import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "~/layouts/MainLayout";
import { api } from "~/services/api";

const ShowMovie: React.FC = () => {
  const { id } = useParams();

  const { data } = useQuery(["movies", id], async () => {
    const response = await api.get(`/films/${id}`);
    return response.data;
  },{
    suspense: true
  });

  return (
    <MainLayout>
      <Suspense>
        <MainLayout.Header>
          <div className="flex items-center space-x-1">
            <h2 className="line-clamp-1 dark:text-navy-50 text-xl font-medium text-slate-700 lg:text-2xl">
              {data.title}
            </h2>
          </div>
        </MainLayout.Header>
        <div className="w-full flex flex-col gap-5">{JSON.stringify(data, null, 2)}</div>
      </Suspense>
    </MainLayout>
  );
};

export default ShowMovie;
