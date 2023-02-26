
export const GET = async ({ params }) => {
    const { user_id } = params;

    return new Response(JSON.stringify({}), { status: 200 });
}

export const POST = async ({ params }) => {
    const { user_id } = params;

    return new Response(JSON.stringify({}), { status: 200 });
}

//users/br80sh6kzdwh2ep/records