import EntityList from "@app/admin/options/components/EntityList";

export default async function MenuPage() {
    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Card Options Management</h1>
            <EntityList />
        </div>
)
}
