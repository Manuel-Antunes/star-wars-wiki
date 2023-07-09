import { flexRender } from '@tanstack/react-table';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { DataTable } from '~/@types/table/DataTable';
import TableSortLabel from '~/components/molecules/table/TableSortLabel';
import GrowSpinner from '~/partials/GrowSpinner';

interface TableProps<T> {
   table: DataTable<T>;
   fallback?: React.ReactNode;
}

const TableComponent = <T,>({ table, fallback = 'Nenhum resultado encontrado!' }: TableProps<T>) => (
   <div className="min-w-full overflow-x-auto relative">
      <table className="is-hoverable w-full min-w-[47.5rem] text-left">
         <thead>
            {table.getHeaderGroups().map(
               (headerGroup, index) =>
                  index > 0 && (
                     <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                           <th
                              key={header.id}
                              colSpan={header.colSpan}
                              className="first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap bg-slate-200 px-4 py-3 font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100 lg:px-5"
                           >
                              {header.column.getCanSort() ? (
                                 <TableSortLabel
                                    title="Sortear"
                                    active={table.getState()?.sorting[0]?.id === header.column.id}
                                    direction={header.column.getIsSorted() || 'asc'}
                                    onClick={() => header.column.toggleSorting()}
                                    className="w-fit flex gap-2 justify-start items-center select-none transition-all duration-100 whitespace-nowrap font-semibold uppercase text-slate-800 dark:bg-navy-800 dark:text-navy-100"
                                 >
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                 </TableSortLabel>
                              ) : (
                                 flexRender(header.column.columnDef.header, header.getContext())
                              )}
                           </th>
                        ))}
                     </tr>
                  ),
            )}
         </thead>
         <AnimatePresence mode="wait">
            {table.isLoading ? (
               <motion.tbody
                  key="spinner"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
               >
                  <tr>
                     <td colSpan={table.getHeaderGroups()[1] ? table.getHeaderGroups()[1].headers.length : 1}>
                        <div className="flex justify-center items-center p-6 border-y border-transparent border-b-slate-200 dark:border-b-navy-500">
                           <GrowSpinner size="3xl" />
                        </div>
                     </td>
                  </tr>
               </motion.tbody>
            ) : (
               <motion.tbody
                  layout="position"
                  key="table-body"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
               >
                  {table.getRowModel().rows.length ? (
                     table.getRowModel().rows.map((row) => (
                        <motion.tr
                           layout
                           key={row.id}
                           className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500 group/tableRow"
                        >
                           {row.getVisibleCells().map((cell) => (
                              <motion.td
                                 layout
                                 key={cell.id}
                                 className="whitespace-nowrap px-3 py-3 font-medium text-slate-700 dark:text-navy-100 lg:px-5"
                              >
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </motion.td>
                           ))}
                        </motion.tr>
                     ))
                  ) : (
                     <motion.tr
                        layout
                        className="border-y border-transparent border-b-slate-200 dark:border-b-navy-500"
                     >
                        <motion.td
                           layout
                           colSpan={table.getHeaderGroups()[1] ? table.getHeaderGroups()[1].headers.length : 1}
                           className="whitespace-nowrap px-3 py-5 text-center font-medium text-slate-700 dark:text-navy-100 lg:px-5"
                        >
                           {fallback}
                        </motion.td>
                     </motion.tr>
                  )}
               </motion.tbody>
            )}
         </AnimatePresence>
      </table>
   </div>
);

export default TableComponent;
