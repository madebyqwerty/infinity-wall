
import { pb } from '@pocketbase';
import { get_date_in_ddmmyyyy, get_date_from_ddmmyyyy } from '@utils/dates';

await pb.collection('admins').authWithPassword('admin', '123456');

export const GET = async ({ params }) => {
    try {
        const { user_id, record_id } = params;

        const record = await pb.collection('records').getOne(record_id, {});

        const { id, date, time, language, rating, description } = record;

        return new Response(JSON.stringify({ id: id, date: get_date_in_ddmmyyyy(new Date(date)), "time-spent": time.toString(), "programming-language": language, rating: rating, description: description }), { status: 200 });
    }
    catch {
        return new Response(JSON.stringify(""), { status: 404 });
    }
}

export const DELETE = async ({ params }) => {
    try {
        const { user_id, record_id } = params;

        await pb.collection('records').delete(record_id);

        return new Response(JSON.stringify(""), { status: 200 });
    }
    catch {
        return new Response(JSON.stringify(""), { status: 404 });
    }
}

export const PUT = async ({ request, params }) => {
    try {
        const { user_id, record_id } = params;
        const body = await request.json();

        var today = new Date();
        var input_date = get_date_from_ddmmyyyy(body["date"]);

        if (input_date > today) {
            return new Response(JSON.stringify(""), { status: 404 });
        }

        await pb.collection('records').update(record_id, { "time": parseInt(body["time-spent"]), "rating": parseInt(body["rating"]), "description": body["description"], "user": user_id, "date": input_date.toISOString(), "language": body["programming-language"] });

        const record = await pb.collection('records').getOne(record_id, {});
        const { id, date, time, language, rating, description } = record;

        return new Response(JSON.stringify({ id: id, date: get_date_in_ddmmyyyy(new Date(date)), "time-spent": String(time), "programming-language": language, rating: rating, description: description }), { status: 200 });
    }
    catch {
        return new Response(JSON.stringify(""), { status: 404 });
    }
}