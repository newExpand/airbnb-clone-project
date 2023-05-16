import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import axios from "axios";

export async function POST(req: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    try {
        // 인증 토큰 발급 받기
        const getTokenRequest = await axios({
            url: "https://api.iamport.kr/users/getToken",
            // POST method
            method: "post",
            // "Content-Type": "application/json"
            headers: { "Content-Type": "application/json" },
            data: {
                // REST API키
                imp_key: process.env.IMP_KEY,
                // REST API Secret
                imp_secret: process.env.IMP_SECRET,
            },
        });

        // 토큰값
        const getToken = getTokenRequest.data.response.access_token;

        const body = await req.json();
        const { tripListId } = body;

        const resultTripListing = await prisma.reservation.findUnique({
            where: {
                id: tripListId,
            },
        });

        /* 포트원 REST API로 결제환불 요청 */

        const getCancelData = await axios({
            url: "https://api.iamport.kr/payments/cancel",
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: getToken, // 포트원 서버로부터 발급받은 엑세스 토큰
            },
            data: {
                merchant_uid: resultTripListing?.merchant_uid, // imp_uid를 환불 `unique key`로 입력
                amount: resultTripListing?.totalPrice, // 가맹점 클라이언트로부터 받은 환불금액
            },
        });

        const { response } = getCancelData.data; // 환불 결과

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({ error: "환불에 실패했습니다." }, { status: 500 });
    }
}
