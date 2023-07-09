import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { DataTable } from '~/@types/table/DataTable';


interface TablePaginationProps<T> {
   table: DataTable<T>;
}

const TablePagination = <T,>({ table }: TablePaginationProps<T>) => {
   //* constants
   const tableState = table.getState();
   const currentPage = tableState.pagination.pageIndex + 1;

   const firstPage = 1;
   const totalPages = table.getPageCount();
   const lastPage = totalPages;
   const ellipsis = '...';

   const renderPageButtons = () => {
      const buttons = [];

      // Botão anterior
      buttons.push(
         <li key="previous">
            <button
               type="button"
               title="Página anterior"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
               className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-300 focus:bg-slate-300 dark:text-navy-200 dark:hover:bg-navy-450 dark:focus:bg-navy-450"
            >
               <BsChevronLeft />
            </button>
         </li>,
      );

      // Botão da primeira página
      if (table.getCanPreviousPage()) {
         buttons.push(
            <li key={`page-${firstPage}`}>
               <button
                  type="button"
                  title="Primeira página"
                  onClick={() => table.setPageIndex(0)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-300 focus:bg-slate-300 dark:text-navy-200 dark:hover:bg-navy-450 dark:focus:bg-navy-450"
               >
                  {firstPage}
               </button>
            </li>,
         );
      }

      // Botão da página anterior à atual
      if (currentPage > 2) {
         buttons.push(
            <li key={`page-${currentPage - 1}`}>
               <button
                  type="button"
                  title={`Página ${currentPage - 1}`}
                  onClick={() => table.previousPage()}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-300 focus:bg-slate-300 dark:text-navy-200 dark:hover:bg-navy-450 dark:focus:bg-navy-450"
               >
                  {currentPage - 1}
               </button>
            </li>,
         );
      }

      // Botão da página atual
      buttons.push(
         <li key={`page-${currentPage}`}>
            <button
               type="button"
               title="Página atual"
               disabled
               className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-300 focus:bg-slate-300 bg-violet-500 dark:text-navy-200 dark:hover:bg-violet-500/80 dark:focus:bg-violet-500"
            >
               {currentPage}
            </button>
         </li>,
      );

      // Botão da página seguinte à atual
      if (currentPage < lastPage - 1) {
         buttons.push(
            <li key={`page-${currentPage + 1}`}>
               <button
                  type="button"
                  title={`Página ${currentPage + 1}`}
                  onClick={() => table.nextPage()}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-300 focus:bg-slate-300 dark:text-navy-200 dark:hover:bg-navy-450 dark:focus:bg-navy-450"
               >
                  {currentPage + 1}
               </button>
            </li>,
         );
      }

      // Botão da última página
      if (table.getCanNextPage()) {
         buttons.push(
            <li key={`page-${lastPage}`}>
               <button
                  type="button"
                  title="Última página"
                  disabled={currentPage === lastPage}
                  onClick={() => table.setPageIndex(lastPage - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-300 focus:bg-slate-300 dark:text-navy-200 dark:hover:bg-navy-450 dark:focus:bg-navy-450"
               >
                  {lastPage}
               </button>
            </li>,
         );
      }

      // Botão seguinte
      buttons.push(
         <li key="next">
            <button
               type="button"
               title="Próxima página"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
               className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-300 focus:bg-slate-300 dark:text-navy-200 dark:hover:bg-navy-450 dark:focus:bg-navy-450"
            >
               <BsChevronRight />
            </button>
         </li>,
      );

      // Adicionar elipse entre os botões
      if (currentPage > 2 && currentPage - 1 !== firstPage + 1) {
         buttons.splice(
            2,
            0,
            <li key="ellipsis-start">
               <span className="flex h-8 w-8 items-center justify-center rounded-full">{ellipsis}</span>
            </li>,
         );
      }
      if (currentPage < totalPages - 1 && currentPage + 1 !== lastPage - 1) {
         buttons.splice(
            buttons.length - 2,
            0,
            <li key="ellipsis-end">
               <span className="flex h-8 w-8 items-center justify-center rounded-full">{ellipsis}</span>
            </li>,
         );
      }

      return buttons;
   };

   //* render
   return (
      <div className="flex flex-col gap-2 justify-end px-4 py-4 sm:flex-row sm:items-center sm:px-5">
         <ul className="w-fit flex items-center justify-center rounded-full bg-slate-150 dark:bg-navy-500 transition-all duration-500 ease-in-out">
            {renderPageButtons()}
         </ul>
      </div>
   );
};

export default TablePagination;
