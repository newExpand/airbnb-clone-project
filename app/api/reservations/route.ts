import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    const body = await req.json();

    const { listingId, startDate, endDate, totalPrice, merchant_uid } = body;

    if (!listingId || !startDate || !endDate || !totalPrice || !merchant_uid)
        return NextResponse.error();

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                    merchant_uid,
                },
            },
        },
    });

    return NextResponse.json(listingAndReservation);
}
