import EntityList from "@app/admin/faqs/components/EntityList";

export default async function Faq() {
    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">FQA Management</h1>
            <EntityList />
        </div>
)
}