const { PrismaClient, UserRole, BuildType } = require("./app/generated/prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function seedUsers()
{
    const admin = await prisma.user.upsert({
        where: { email: "adm@adm.com" },
        update: {},
        create: {
            email: "adm@adm.com",
            password: await bcrypt.hash("q1w2e3r4t5y6", parseInt(process.env.BCRYPT||'')||10),
            role: UserRole.admin,
            name: "Admin User"
        }
    })
    console.log({ admin })
}


async function seedBuilders()
{
    const builders = [
        {
            build_type: BuildType.text,
            label: 'Text',
        },
        {
            build_type: BuildType.textarea,
            label: 'Textarea',
        },
        {
            build_type: BuildType.htmlEditor,
            label: 'HTML Editor',
        },
        {
            build_type: BuildType.faq,
            label: 'FAQ',
        },
        {
            build_type: BuildType.casinoTop,
            label: 'Casino Top',
        },
        {
            build_type: BuildType.slotCard,
            label: 'Slot Card',
        },
        {
            build_type: BuildType.cart,
            label: 'Cart',
        },
        {
            build_type: BuildType.btnBlock,
            label: 'Button Block',
        },
    ]

    for (const [idx, builder] of builders.entries()) {
        const id = idx + 1;
        await prisma.builder.upsert({
            where: {id: id},
            update: {},
            create: {
                id: id,
                build_type: builder.build_type,
                label: builder.label,
            }
        });
    }
}

async function seedPages()
{
    const pages = [
        {
            label: 'Home',
            meta_title: 'Home',
            meta_description: 'Home',
            meta_keywords: 'Home',
            slug: 'home',
            published: true,
            text: 'Home page text',
        },
    ]

    for (const page of pages) {
        await prisma.page.upsert({
            where: {slug: page.slug},
            update: {},
            create: {
                label: page.label,
                slug: page.slug,
                published: page.published,
                meta_title: page.meta_title,
                meta_description: page.meta_description,
                meta_keywords: page.meta_keywords,
                builds: {
                    create: {
                        build_id: 1,
                        position: 1,
                        field_values: page.text,
                    }
                }
            }
        });
    }
}

async function main() {
    await seedUsers();
    await seedBuilders();
    await seedPages();
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
