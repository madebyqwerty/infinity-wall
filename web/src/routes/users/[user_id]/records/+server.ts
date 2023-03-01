
import { pb } from '@pocketbase';
import { get_date_in_ddmmyyyy, get_date_from_ddmmyyyy } from '@utils/dates';
import { from_hours_and_minutes, to_hours_and_minutes } from '@utils/time';

pb.admins.authWithPassword("login@vaclavparma.cz", "testtesttest")

export const GET = async ({ params }) => {
    try {
        const { user_id } = params;

        const records = await pb.collection('records').getFullList(200, {
            sort: '-created',
        });

        var out = [];
        records.forEach(element => {
            console.log(element)
            const { id, date, time, language, rating, description } = element;
            out.push({
                "id": id,
                "date": date,
                "time-spent": to_hours_and_minutes(time),
                "programming-language": language,
                "rating": rating,
                "description": description
            });
        });

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

        const created = await pb.collection('records').create({ "time": from_hours_and_minutes(body["time-spent"]), "rating": parseInt(body["rating"]), "description": body["description"], "user": user_id, "date": get_date_from_ddmmyyyy(body["date"]).toISOString(), "language": body["programming-language"] });

        const record = await pb.collection('records').getOne(created.id, {});

        const { id, date, time, language, rating, description } = record;

        return new Response(JSON.stringify({ id: id, date: get_date_in_ddmmyyyy(new Date(date)), "time-spent": to_hours_and_minutes(time), "programming-language": language, rating: rating, description: description }), { status: 200 });
    }
    catch {
        return new Response(JSON.stringify(""), { status: 404 });
    }
}