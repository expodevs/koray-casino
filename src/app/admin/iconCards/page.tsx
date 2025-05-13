import EntityList from "@app/admin/iconCards/components/EntityList";

export default async function MenuPage() {
    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Icon Card cards Management</h1>
            <EntityList />
        </div>
)
}