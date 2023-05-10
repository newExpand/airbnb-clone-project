import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    reservationId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
        throw new Error("ID가 일치하지 않습니다");
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
        },
    });

    return NextResponse.json(reservation);
}
