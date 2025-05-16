import Link from "next/link";
import Image from "next/image";


export default async function CardsGrid() {


    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Cards Management</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
                <Link href="/admin/cards/card"
                      className="block rounded overflow-hidden shadow hover:shadow-lg transition">
                    <Image
                        src="/assets/images/card.webp"
                        alt="Card Type"
                        width={400}
                        height={600}
                        className="w-full h-120 object-cover"
                    />
                </Link>
                <Link href="/admin/cards/cart"
                      className="block rounded overflow-hidden shadow hover:shadow-lg transition">
                    <Image
                        src="/assets/images/cart.webp"
                        alt="Cart Type"
                        width={400}
                        height={600}
                        className="w-full h-120 object-cover"
                    />
                </Link>
            </div>
        </div>
    )
}
