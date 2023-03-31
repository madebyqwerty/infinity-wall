<script>

    export let data;

    let commits = [
    {
      id: '1',
      author: 'John Doe',
      datum: '2023-03-31T13:21:48.479224',
      lines_added: 10,
      lines_removed: 5,
      description: 'Added a new feature'
    },
    {
      id: '2',
      author: 'Jane Smith',
      datum: '2020-01-01T13:21:48.479224',
      lines_added: 20,
      lines_removed: 10,
      description: 'Fixed a bug'
    },
    {
      id: '3',
      author: 'Bob Johnson',
      datum: '2020-01-03T13:21:48.479224',
      lines_added: 15,
      lines_removed: 5,
      description: 'Refactored code'
    }
  ];
let commitMax = Math.max(...commits.map(commit => commit.lines_added+commit.lines_removed));
let lines_added = commits.map(commit => commit.lines_added);
let lines_removed = commits.map(commit => commit.lines_removed);

//make an array of the last

</script>

<div id="container">
    <section class="text-5xl">Users</section>
    <section class="flex justify-center"><h2 class="text-5xl">Commity</h2> 
        <div class="graph flex flex-row justify-between gap-4 items-end flex-grow max-w-3xl">
    {#each commits as commit}
<div class="couple flex flex-row justify-between gap-2 items-end" style={`width:calc(50% - .5rem);height:100%;`}>
    <div class="bar box-border bg-green-600" style="height:{commit.lines_added/commitMax*100}%;width:80%;"></div>
    <div class="bar box-border bg-red-600" style="height:{commit.lines_removed/commitMax*100}%;width:80%;"></div>
</div>

    
{/each}
</div>
</section>
<section class="text-5xl">System Info</section>
</div>


<style>
    #container{
        height:100vh;
        width:100vw;
        padding:50px;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
    }
    #container > *{
        height:calc(calc(calc(100vh - 100px) / 3) - 25px);
        width:calc(100vw - 100px);
        background:orangered;
    }
</style>