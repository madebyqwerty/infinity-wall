
export const GET = async ({ params }) => {
    const { user_id, record_id } = params;

    return new Response(JSON.stringify({ User: user_id, Record: record_id }), { status: 200 });
}

export const DELETE = async () => {
    //const { user_id, record_id } = params;{ params }

    return new Response("", { status: 200 });
}

export const PUT = async () => {
    //const { user_id, record_id } = params;{ params }

    return new Response("", { status: 200 });
}


//users/br80sh6kzdwh2ep/records/ilp08lfxn2b3tl4
