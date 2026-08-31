import RequestList from '@app/admin/requests/components/RequestList';

export default function RequestsPage() {
    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Requests</h1>
            <RequestList />
        </div>
    );
}
