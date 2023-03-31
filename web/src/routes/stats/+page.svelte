<script>


    export let data;
    console.log(data)

    let commits = data.commits;
let commitMax = Math.max(...commits.map(commit => commit.commit.lines_added>commit.commit.lines_removed?commit.commit.lines_added:commit.commit.lines_removed));



//make an array of the last 20 commits
let last20 = commits.sort((a,b)=>{
    //sort by datum
    if(new Date(a.commit.datum) > new Date(b.commit.datum)){
        return 1;
    }else if(new Date(a.commit.datum) < new Date(b.commit.datum)){
        return -1;
    }else{
        return 0;
    }
}).slice(Math.max(commits.length - 8, 0))
let lines_added = last20.map(commit => commit.commit.lines_added);
let lines_removed = last20.map(commit => commit.commit.lines_removed);

let users = data.users
let userKeys = Object.keys(users).sort((a,b)=>{
    //sort by commits
    if(users[a][0].commits.length > users[b][0].commits.length){
        return -1;
    }else if(users[a][0].commits.length < users[b][0].commits.length){
        return 1;
    }else{
        return 0;
    }
});
let last20users=userKeys.slice(Math.max(userKeys.length - 12, 0));
let usersMax = Math.max(...last20users.map(user => Object.keys(users[user][0].commits).length));
let date10 = new Date("2023-03-01");
let date20 = new Date();
// subtract date1 from date2 and return the difference in string "days hours"
function dateDiff(date1, date2) {
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;

    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes

    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes

    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures

    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;

    return diff;
}
let now =  new Date();
console.log(dateDiff(now, new Date(data.systemInfo.boot_time)));
</script>

<div id="container">
    <a href="/" class="abso"> &#60;</a>
    <section class="flex flex-col text-center justify-center gap-8 mx-auto"><h2  class="text-3xl flex-1">
        System Info
        </h2> 
        
        
        
        <div class="stats shadow max-h-36 rounded-2xl">
          
            <div class="stat place-items-center">
                <div class="stat-figure text-secondary">
                    <iconify-icon width="50" icon="material-symbols:nest-clock-farsight-analog-outline"></iconify-icon>
                   </div>
              <div class="stat-title">Čas bootu</div>
              <div class="stat-value">{`${dateDiff(new Date(data.systemInfo.boot_time),now).day}d ${dateDiff(new Date(data.systemInfo.boot_time),now).hour}h`}</div>
              <div class="stat-desc">{new Date(data.systemInfo.boot_time).toLocaleDateString("cs") + " " + new Date(data.systemInfo.boot_time).toLocaleTimeString("cs")}</div>
            </div>
            
            
            
            
              <div class="stat place-items-center">
                <div class="stat-figure text-secondary">
                    <iconify-icon width="50" icon="material-symbols:auto-awesome-mosaic"></iconify-icon>
                   </div>
                <div class="stat-title">Platforma</div>
                <div class="stat-value">{data.systemInfo.platform.length>10?data.systemInfo.platform.slice(0,10)+"...":data.systemInfo.platform}</div>
                <div class="stat-desc">{data.systemInfo.platform}</div>
              </div>
              
            
          </div>
          <div class="stats shadow max-h-36 rounded-2xl"><div class="stat place-items-center">
            <div class="stat-figure text-secondary">
                <iconify-icon width="50" icon="mdi:harddisk"></iconify-icon>
               </div>
                <div class="stat-title">Využití disku</div>
                <div class="stat-value">{data.systemInfo.disk_usage}%</div>
              </div><div class="stat place-items-center">  <div class="stat-figure text-secondary">
                <iconify-icon width="50" icon="bi:memory"></iconify-icon>
               </div>
                <div class="stat-title">Zátěž RAM</div>
                <div class="stat-value">{data.systemInfo.ram_usage}%</div>
              </div><div class="stat place-items-center">  <div class="stat-figure text-secondary">
                <iconify-icon width="50" icon="ph:cpu"></iconify-icon>
               </div>
              <div class="stat-title">Zátěž CPU</div>
              <div class="stat-value">{data.systemInfo.cpu_load.toString().length>5?data.systemInfo.cpu_load.toString().slice(0,5)+"..":data.systemInfo.cpu_load}%</div>

            </div></div>
        </section>
    <section class="flex flex-col justify-center gap-8 mx-auto text-center"><div class="text-center">
        <h2 class="text-3xl">Nejpracovitější uživatelé</h2>
        (commity)
    </div>
        <div class="graph  flex flex-row justify-between gap-4 items-end flex-grow max-w-3xl">
            {#each last20users as user}
        <div class="couple relative flex flex-row justify-between items-end" style={`width:100%;height:100%;`}>
            <div class="bar box-border bg-blue-600" style="height:{users[user][0].commits.length/usersMax*100}%;width:100%;"></div>
            <div class="name">{users[user][0].commits.length}</div>
            <div class="tooltip avatar4" data-tip={users[user][0].nick}><img src="{users[user][0].avatar_url}" alt="" class="avatar2"></div>
        </div>
        
            
        {/each}
    </section>
    <section class="flex flex-col justify-center gap-8 mx-auto text-center"><h2 class="text-3xl">Poslední commity</h2> 
        <div class="graph flex flex-row justify-between gap-4 items-end flex-grow max-w-3xl">
    {#each last20 as commit}
<div class="couple relative flex flex-row justify-between gap-2 items-end" style={`width:calc(50% - .5rem);height:100%;`}>
    <div class="bar box-border bg-green-600" style="height:{commit.commit.lines_added/commitMax*100}%;width:80%;"></div>
    <div class="bar box-border bg-red-600" style="height:{commit.commit.lines_removed/commitMax*100}%;width:80%;"></div>
    <div class="name">{new Date(commit.commit.date).toLocaleDateString("cs").slice(0,-5).replace(" ", "")} {`${new Date(commit.commit.date).getHours().toString().padStart(2, '0')}:${new Date(commit.commit.date).getMinutes().toString().padStart(2, '0')}`}<br/>{"+"+commit.commit.lines_added.toString()+" -"+commit.commit.lines_removed.toString()}</div>
    <div class="tooltip avatar3" data-tip={users[commit.user.userID][0].nick}><img src="{commit.user.avatar_url}" alt="" class="avatar2"></div>
</div>

    
{/each}
</div>
</section>

</div>


<style>
    .abso{
        position:absolute;
        top:0;
        left:0;
        font-size:2rem;
        padding:1rem;
        cursor:pointer;
        width:3rem;
        height:3rem;
        border-radius:50%;
    }
    .avatar{
        position:absolute;
        bottom:0;
        left:50%;
        transform:translate(-50%,200%);
        width: 25px;
        height: 25px;
        border-radius:10px;
        
    }
    .avatar2{
        position:absolute;
        top:0;
        left:0;
        width: 25px;
        height: 25px;
        border-radius:10px;
        
    }
    .avatar3{
        position:absolute;
        bottom:0;
        left:50%;
        transform:translate(-50%,250%);
        width: 25px;
        height: 25px;
        border-radius:10px;
        
    }
    .avatar4{
        position:absolute;
        bottom:0;
        left:50%;
        transform:translate(-50%,200%);
        width: 25px;
        height: 25px;
        border-radius:10px;
        
    }
.bar{
    border-radius:4px;
}
section>*{
    width:100%;
}
.name{
        position:absolute;
        bottom:0;
        left:50%;
        transform:translate(-50%,100%);
        width: max-content;
        font-size:70%;
        text-align:center
    }
    #container{
        height:100vh;
        width:100vw;
        padding:50px;
        display:flex;
        flex-direction: column;
    }
    #container > *{
        height:100%;
        width:90%;
        padding:80px;
    }
</style> 