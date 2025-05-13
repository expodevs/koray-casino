const { PrismaClient, UserRole } = require("./app/generated/prisma/client")
const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

async function main() {
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

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
