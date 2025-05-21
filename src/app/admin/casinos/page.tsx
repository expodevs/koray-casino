
import EntityList from "@app/admin/casinos/components/EntityList";

export default async function CasinosPage() {
    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Casinos Management</h1>
            <EntityList />
        </div>
    )
}
