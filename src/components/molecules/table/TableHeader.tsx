import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BsFilter } from "react-icons/bs";
import { DataTable } from "~/@types/table/DataTable";

interface TableHeaderProps<T> extends PropsWithChildren {
  table: DataTable<T>;
}

const TableHeader = <T,>({ table, children }: TableHeaderProps<T>) => {
  //* hooks
  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useFormContext();

  //* states
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  //* handlers
  const onSubmit = handleSubmit(formData => {
    table.setGlobalFilter((data: T) => ({ ...data, ...formData }));
  });

  const handleReset = useCallback(() => {
    reset();
    table.setGlobalFilter(undefined);
  }, [reset, table]);

  //* render
  return (
    <div className="transition-all w-full flex flex-col gap-5 justify-center items-start">
      <div className="flex flex-wrap items-center justify-between gap-4 w-full">
        <h2 className="text-white text-base font-semibold">Selecione seus filtros</h2>
        <div className="justify-self-end flex gap-5 items-center">
          <button
            type="button"
            title="Abrir filtros"
            onClick={() => setIsFilterOpen(prev => !prev)}
            className="h-fit btn rounded-full p-1 m-0 bg-transparent dark:hover:bg-navy-400"
          >
            <BsFilter
              size={16}
              className={clsx("transition-all", {
                "rotate-180": isFilterOpen,
              })}
            />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isFilterOpen && (
          <motion.form
            key="filter-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onSubmit={onSubmit}
            className="w-full flex flex-col gap-5"
          >
            <motion.div layout className="w-full grid grid-cols-12 gap-2.5">
              {children}
            </motion.div>
            <motion.div
              layout
              className="w-full flex items-center justify-end gap-2.5"
            >
              <button
                type="button"
                title="Cancelar"
                onClick={() => setIsFilterOpen(prev => !prev)}
                className="btn rounded border border-slate-gray-400 text-sm text-navy-100 px-5 py-3 bg-transparent hover:bg-slate-gray-500 hover:text-white"
              >
                Cancelar
              </button>
              <button
                type="button"
                title="Limpar filtros"
                disabled={!isDirty}
                onClick={handleReset}
                className="btn rounded border border-slate-gray-500 text-sm text-navy-100 px-5 py-3 bg-slate-gray-500 hover:bg-navy-700"
              >
                Limpar filtros
              </button>
              <button
                type="submit"
                title="Filtrar"
                disabled={!isDirty}
                className="btn rounded border border-primary text-sm text-white px-5 py-3 bg-primary hover:bg-violet-600"
              >
                Filtrar
              </button>
            </motion.div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TableHeader;
