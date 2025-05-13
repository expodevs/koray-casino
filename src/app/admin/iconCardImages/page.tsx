import EntityList from "@app/admin/iconCardImages/components/EntityList";

export default async function iconCardImages() {
    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Icon card images Management</h1>
            <EntityList />
        </div>
)
}