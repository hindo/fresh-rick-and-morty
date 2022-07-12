/** @jsx h */
import { h } from "preact";
import { tw } from '@twind';

type Props = {
  classNames?: string;
  currentPage: number;
  totalPages: number;
}

export default function Pagination({classNames, currentPage, totalPages}: Props) {
  const thresholdValue = currentPage <= totalPages -5
    ? (currentPage > 5 ? currentPage - 5 : 0)
    : (totalPages - 9);
  
  return (
    <div class={tw`flex flex-row gap-2 ${classNames}`}>
      {currentPage !== 1 && <div class={tw`
        border rounded-md border-gray-300 hover:border-gray-500
        dark:(border-gray-700 hover:border-gray-500)
      `}>
        <a class={tw`inline-block py-1 px-3 text-center`} href={`/ram/1`}>First</a>
      </div>}
      {[...Array(9)].map((_, idx) => 
        <div class={tw`
            border rounded-md border-gray-300 hover:border-gray-500
            dark:(border-gray-700 hover:border-gray-500)
            ${currentPage === idx + 1 + thresholdValue && 'bg-gray-300 dark:bg-gray-700'}
          `}>
          <a class={tw`inline-block py-1 w-10 text-center`} href={`/ram/${idx + 1 + thresholdValue}`}>{idx + 1 + thresholdValue}</a>
        </div>
      )}
      {currentPage !== totalPages && <div class={tw`
        border rounded-md border-gray-300 hover:border-gray-500
        dark:(border-gray-700 hover:border-gray-500)
      `}>
        <a class={tw`inline-block py-1 px-3 text-center`} href={`/ram/${totalPages}`}>Last</a>
      </div>}
    </div>
  )
}