import { fail} from "@sveltejs/kit"
import {z} from "zod"
import {zfd} from "zod-form-data"
import type {Actions} from "./$types";
import { languageNames } from "@utils/languages";

export const actions:Actions = {
    default:async({locals,request,url})=>{
        const data = await request.formData();
        const {date,length,rating,language,description} = Object.fromEntries(data);
        const schema = zfd.formData({
            date: z.string({required_error:"Neplatné datum"}),
            length: z.number({required_error:"Neplatná délka"}).minValue(0, "Délka musí být větší než 0").maxValue(1440, "Délka nesmí být více než jeden den"),
            rating: z.number({required_error:"Neplatné hodnocení"}).minValue(1, "Hodnocení musí být alespoň jedna hvězda").maxValue(5, "Hodnocení nesmí být více jak 5 hvězd"),
            language: z.enum(languageNames, "Neplatný jazyk"),
            description: z.string().max(500, "Popis nesmí být delší než 500 znaků")
        })
    }
}