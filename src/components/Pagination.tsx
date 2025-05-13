export default function Pagination({page, total, setPageCallback}: {
    page: number,
    total: number,
    setPageCallback: (page: number) => void
}) {

    return <>
        <div className="mt-4 flex justify-center">
            <button
                onClick={() => setPageCallback((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Previous
            </button>
            <span className="mx-4 mt-2">
                Page {page} of {total || 1}
            </span>
            <button
                onClick={() =>
                    setPageCallback((p) => Math.min(total || 1, p + 1))
                }
                disabled={page >= (total || 1)}
                className="p-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
                Next
            </button>
        </div>
    </>;

}
