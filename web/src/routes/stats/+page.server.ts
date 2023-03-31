
export const load = async ({ fetch }) => {
    const headers: HeadersInit = {
        'accept': 'application/json',
        'x-access-token': 'a4ced53e5ce70b738f88b70113bc806d'
    }
    const commits_request = await fetch('https://tda.knapa.cz/commit', {
        method: 'GET',
        headers
    });
    const raw_commits = await commits_request.json();
    
    const users_request = await fetch('https://tda.knapa.cz/user/', {
        method: 'GET',
        headers
    });
    const raw_users = await users_request.json();
    
    const sysinfo_request = await fetch('https://tda.knapa.cz/sysinfo/', {
        method: 'GET',
        headers
    });
    const sysinfo = await sysinfo_request.json();
    
    let commits_by_id = {}
    raw_commits.forEach((element:any) => {
        commits_by_id[element["creator_id"]] ??= [element]
        commits_by_id[element["creator_id"]] = [...commits_by_id[element["creator_id"]], element]
    });
    
    let users = {}
    raw_users.forEach((element:any) => {
        users[element["userID"]] = [element]
        users[element["userID"]][0].commits = commits_by_id[element["userID"]]?commits_by_id[element["userID"]]: []
    })

    let commits = []
    raw_commits.forEach((element:any) => {
        commits = commits.concat({
            "commit": element, 
            "user": {
                "name": users[element["creator_id"]][0]["name"],
                "surname": users[element["creator_id"]][0]["surname"],
                "nick": users[element["creator_id"]][0]["nick"],
                "avatar_url": users[element["creator_id"]][0]["avatar_url"],
                "userID": users[element["creator_id"]][0]["userID"],
                "commits": commits_by_id[element["creator_id"]].length
            }
        })
    })
    
    return {
        commits: commits,
        users: users,
        systemInfo: sysinfo
    }
};