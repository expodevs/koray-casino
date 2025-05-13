import PageList from "@app/admin/pages/components/PageList";

export default async function MenuPage() {
    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Pages Management</h1>
            <PageList />
        </div>
)
}