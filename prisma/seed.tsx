const { PrismaClient, UserRole, BuildType, InputType, MenuType } = require("./app/generated/prisma/client")
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
        {
            label: 'About Us',
            meta_title: 'About Us',
            meta_description: 'Learn about our company',
            meta_keywords: 'about, company, team',
            slug: 'about',
            published: true,
            text: 'About Us page content',
        },
        {
            label: 'Contact',
            meta_title: 'Contact Us',
            meta_description: 'Get in touch with our team',
            meta_keywords: 'contact, email, phone',
            slug: 'contact',
            published: true,
            text: 'Contact page information',
        },
        {
            label: 'Blog',
            meta_title: 'Blog',
            meta_description: 'Read our latest articles',
            meta_keywords: 'blog, articles, news',
            slug: 'blog',
            published: false,
            text: 'Blog page content',
        }
    ]

    for (const page of pages) {
        const builds = [];

        builds.push(
            {
                build_id: 8, // btnBlock
                position: 1,
                field_values: JSON.stringify({
                    type:"inline",
                    buttons: [
                        { label: "Best Casinos", link: "/casinos" },
                        { label: "New Games", link: "/games" }
                    ]
                }),
            },
            {
                build_id: 3, //HTMLEditor
                position: 2,
                field_values: "<h2>" + page.label + "</h2><p>This is HTML content for " + page.label + "</p>",
            },
            {
                build_id: 1, //Text
                position: 3,
                field_values: page.text,
            },
        );

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
                    create: builds
                }
            }
        });
    }
}

async function seedSettings() {
    const settings = [
        {
            code: "footer-text",
            input_type: InputType.textarea,
            value: "Paragraph base. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            label: "Footer text",
            link: null,
        },
        {
            code: "copyright",
            input_type: InputType.text,
            value: "Copyright © 2025 Casino-kit. All Rights Reserved",
            label: "Copyright",
            link: null,
        },
        {
            code: "logo",
            input_type: InputType.image,
            value: "/uploads/logo/logo.png",
            label: "Logo",
            link: null,
        },
    ];

    for (const setting of settings) {
        await prisma.setting.upsert({
            where: { code: setting.code },
            update: {
                value: setting.value,
                input_type: setting.input_type,
                label: setting.label,
                link: setting.link,
            },
            create: {
                code: setting.code,
                input_type: setting.input_type,
                value: setting.value,
                label: setting.label,
                link: setting.link,
            },
        });
    }

    console.log("▶️  Seeded Settings:");
    settings.forEach((s) => console.log(`${s.code}`));
}

async function seedMenu() {
    const menuItems = [
        {
            id: 2,
            type: MenuType.top,
            published: true,
            label: "Home",
            link: "/",
            parent_id: null,
            position: 1,
        },
        {
            id: 1,
            type: MenuType.top,
            published: true,
            label: "Fortunes",
            link: "/fortunes",
            parent_id: null,
            position: 2,
        },
        {
            id: 3,
            type: MenuType.top,
            published: true,
            label: "Online Slot Games",
            link: "/slot-games",
            parent_id: null,
            position: 3,
        },
        {
            id: 4,
            type: MenuType.top,
            published: true,
            label: "Online Card Games",
            link: "/card-games",
            parent_id: null,
            position: 4,
        },
        {
            id: 5,
            type: MenuType.footer_popular_category,
            published: true,
            label: "Best Online Casino Games",
            link: "/best-online-casino-games",
            parent_id: null,
            position: 1,
        },
        {
            id: 6,
            type: MenuType.footer_popular_category,
            published: true,
            label: "Slot Games",
            link: "/slot-games",
            parent_id: 5,
            position: 1,
        },
        {
            id: 7,
            type: MenuType.footer_information,
            published: true,
            label: "Privacy Policy",
            link: "/privacy-policy",
            parent_id: null,
            position: 1,
        },
    ];

    for (const item of menuItems) {
        await prisma.menu.upsert({
            where: { id: item.id },
            update: {
                type: item.type,
                published: item.published,
                label: item.label,
                link: item.link,
                parent_id: item.parent_id,
                position: item.position,
            },
            create: {
                id: item.id,
                type: item.type,
                published: item.published,
                label: item.label,
                link: item.link,
                parent_id: item.parent_id,
                position: item.position,
            },
        });
    }

    console.log("▶️  Seeded Menu Items:");
    menuItems.forEach((m) => console.log(`   • [${m.type}] ${m.label} (id=${m.id})`));
}

async function main() {
    await seedUsers();
    await seedBuilders();
    await seedPages();
    await seedSettings();
    await seedMenu();
}

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
