import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@app/api/auth/options";
import {UserRole} from "@prismaClient";


export const unAuthorizedAdmin = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user.id) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }
        if (session.user.role !== UserRole.admin) {
            return NextResponse.json({error: 'Forbidden'}, {status: 403});
        }
    } catch {
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
    return null;
}


export const unAuthorized = async () => {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user.id) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }
    } catch {
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
    return null;
}

export async function withAdminAuthorized<Args extends unknown[], Result>(
        handle: (...args: Args) => Promise<Result> | Result,
        ...args: Args
    ): Promise<Result | NextResponse> {

    const resultAuthorized = await unAuthorizedAdmin();
    if (resultAuthorized) {return resultAuthorized;}

    return handle(...args);
}

export async function withAuthorized<Args extends unknown[], Result>(
        handle: (...args: Args) => Promise<Result> | Result,
        ...args: Args
    ): Promise<Result | NextResponse> {

    const resultAuthorized = await unAuthorized();
    if (resultAuthorized) {return resultAuthorized;}

    return handle(...args);
}
