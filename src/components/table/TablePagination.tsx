import { Table } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  const renderPageButtons = () => {
    const buttons = [];

    buttons.push(
      <Button
        key={0}
        variant={currentPage === 0 ? 'blue' : 'outline'}
        size="sm"
        onClick={() => table.setPageIndex(0)}
        disabled={currentPage === 0}
      >
        1
      </Button>
    );

    if (currentPage > 2) {
      buttons.push(<span key="before-ellipsis">...</span>);
    }

    for (let i = Math.max(1, currentPage - 1); i <= Math.min(pageCount - 2, currentPage + 1); i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? 'blue' : 'outline'}
          size="sm"
          onClick={() => table.setPageIndex(i)}
        >
          {i + 1}
        </Button>
      );
    }

    if (currentPage < pageCount - 3) {
      buttons.push(<span key="after-ellipsis">...</span>);
    }

    if (pageCount > 1) {
      buttons.push(
        <Button
          key={pageCount - 1}
          variant={currentPage === pageCount - 1 ? 'blue' : 'outline'}
          size="sm"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={currentPage === pageCount - 1}
        >
          {pageCount}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-600">
        Page {currentPage + 1} sur {pageCount}
      </span>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Précédent
        </Button>

        <div className="flex space-x-1">
          {renderPageButtons()}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
