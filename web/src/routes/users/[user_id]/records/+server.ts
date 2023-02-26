
import { pb } from '@pocketbase';

pb.admins.authWithPassword("login@vaclavparma.cz", "testtesttest")

export const GET = async ({ params }) => {
    try {
        const { user_id } = params;

        const records = await pb.collection('records').getFullList(200 /* batch size */, {
            sort: '-created',
        });

        var out = [];
        records.forEach(element => {
            console.log(element)
            const { id, date, time, language, rating, description } = element;
            out.push({
                "id": id,
                "date": date,
                "time-spent": time.toString(),
                "programming-language": language,
                "rating": rating,
                "description": description
            });
        });

        console.log(out);

        return new Response(JSON.stringify(out), { status: 200 });
    }
    catch {
        return new Response(JSON.stringify(""), { status: 404 });
    }
}



export const POST = async ({ request, params }) => {
    try {
        const { user_id } = params;
        const body = await request.json()

        const created = await pb.collection('records').create({ "time": Number(body["time-spent"]), "rating": Number(body["rating"]), "description": body["description"], "user": user_id, "date": body["date"], "language": body["programming-language"] });

        const record = await pb.collection('records').getOne(created.id, {
            expand: 'relField1,relField2.subRelField',
        });

        const { id, date, time, language, rating, description } = record;

        return new Response(JSON.stringify({ id: id, date: date, "time-spent": time.toString(), "programming-language": language, rating: rating, description: description }), { status: 200 });
    }
    catch {
        return new Response(JSON.stringify(""), { status: 404 });
    }
}