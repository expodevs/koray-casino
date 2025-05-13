import SettingList from "@app/admin/settings/components/SettingList";

export default async function MenuPage() {
    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Settings Management</h1>
            <SettingList />
        </div>
)
}