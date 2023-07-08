import { SortDirection } from '@tanstack/react-table';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { ButtonHTMLAttributes, DetailedHTMLProps, useCallback, useState } from 'react';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

interface IconWithAnimationProps {
   children: JSX.Element | React.ReactNode;
}

const IconWithAnimation: React.FC<IconWithAnimationProps> = ({ children }) => (
   <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1, ease: 'easeInOut' }}
      className="absolute -right-5"
   >
      {children}
   </motion.span>
);

interface ITableSortLabelProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
   active?: boolean;
   direction?: SortDirection;
   children: JSX.Element | React.ReactNode;
}

const TableSortLabel: React.FC<ITableSortLabelProps> = ({ active, direction, children, ...rest }) => {
   //* states
   const [hovered, setHovered] = useState<boolean>(false);

   //* handlers
   const handleOnHover = useCallback(() => {
      setHovered((prev) => !prev);
   }, [setHovered]);

   //* render
   return (
      <button
         {...rest}
         type="button"
         onMouseEnter={() => {
            handleOnHover();
         }}
         onMouseLeave={() => {
            handleOnHover();
         }}
         className={clsx({ ...rest }.className, 'relative')}
      >
         {children}
         <AnimatePresence mode="wait">
            {active ? (
               direction === 'asc' ? (
                  <IconWithAnimation>
                     <FaSortAmountUp />
                  </IconWithAnimation>
               ) : (
                  <IconWithAnimation>
                     <FaSortAmountDown />
                  </IconWithAnimation>
               )
            ) : hovered ? (
               <IconWithAnimation>
                  <FaSortAmountDown className="opacity-50" />
               </IconWithAnimation>
            ) : null}
         </AnimatePresence>
      </button>
   );
};

export default TableSortLabel;
