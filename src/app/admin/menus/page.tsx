import MenuList from "@app/admin/menus/components/MenuList";

export default async function MenuPage() {
    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Menus Management</h1>
            <MenuList />
        </div>
)
}