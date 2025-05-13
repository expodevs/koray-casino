import Link from "next/link";
import Image from "next/image";


export default async function CardsGrid() {


    return (
        <div>
            <h1 className="text-2xl mb-4 px-4">Cards Management</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
                <Link href="/admin/cards/slot_game"
                      className="block rounded overflow-hidden shadow hover:shadow-lg transition">
                    <Image
                        src="/images/slot_game.jpg"
                        alt="Slot Game"
                        width={400}
                        height={200}
                        className="w-full h-32 object-cover"
                    />
                </Link>
                <Link href="/admin/cards/card_game"
                      className="block rounded overflow-hidden shadow hover:shadow-lg transition">
                    <Image
                        src="/images/card_game.jpg"
                        alt="Card Game"
                        width={400}
                        height={200}
                        className="w-full h-32 object-cover"
                    />
                </Link>
                <Link href="/admin/cards/casino_card"
                      className="block rounded overflow-hidden shadow hover:shadow-lg transition">
                    <Image
                        src="/images/casino_card.jpg"
                        alt="Casino Card"
                        width={400}
                        height={200}
                        className="w-full h-32 object-cover"
                    />
                </Link>
                <Link href="/admin/cards/cart"
                      className="block rounded overflow-hidden shadow hover:shadow-lg transition">
                    <Image
                        src="/images/cart.jpg"
                        alt="Cart"
                        width={400}
                        height={200}
                        className="w-full h-32 object-cover"
                    />
                </Link>
            </div>
        </div>
    )
}