import EntityList from "@app/admin/casinoOptions/components/EntityList";

export default async function MenuPage() {
    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Casino Options Management</h1>
            <EntityList />
        </div>
)
}
