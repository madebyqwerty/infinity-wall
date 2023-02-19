<script>
    import { languageIDs, languageNames } from '$lib/utils/languages';
    import { DateInput } from 'date-picker-svelte'
    import {createRecord} from "$lib/pocketbase/createRecord.ts"

  let data = {
    length:0,
    language:"",
    description:"",
    date:new Date(),
    rating:1
  }
  const add = ()=>{
createRecord(data.length, data.language, data.description, data.date, data.rating)
  }
$:console.log(data.rating)
  </script>

<form action="">
    <input type="number" placeholder="Délka" class="input input-bordered w-full max-w-xs" />
    <select class="select select-bordered w-full max-w-xs" bind:value={data.language}>
        <option disabled selected>Vyberte Jazyk</option>
        {#each languageNames as l}
            <option value={l}>{l}</option>
        {/each}
    </select>
    <div class="rating rating-lg">
        <input type="radio" name="rating-9" bind:group={data.rating} value={1} class="mask mask-star-2" />
        <input type="radio" name="rating-9" bind:group={data.rating} value={2} class="mask mask-star-2" />
        <input type="radio" name="rating-9" bind:group={data.rating} value={3} class="mask mask-star-2" />
        <input type="radio" name="rating-9" bind:group={data.rating} value={4} class="mask mask-star-2" />
        <input type="radio" name="rating-9" bind:group={data.rating} value={5} class="mask mask-star-2" />
    </div>
    <textarea class="textarea textarea-bordered" placeholder="Bio" bind:value={data.description}></textarea>

    <DateInput bind:value={data.date}  closeOnSelection={true}/>
    <button on:click={add}>
    Přidat záznam
    </button>
</form>

<style>
    form{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:start;
    }
</style>