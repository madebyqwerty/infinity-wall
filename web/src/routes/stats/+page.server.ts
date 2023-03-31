
export const load = async ({ fetch }) => {
    const headers: HeadersInit = {
        'accept': 'application/json',
        'x-access-token': 'a4ced53e5ce70b738f88b70113bc806d'
    }
    const commits_request = await fetch('https://tda.knapa.cz/commit/latest/50', {
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
    
    let commits = {}
    raw_commits.forEach((element:any) => {
        commits[element["creator_id"]] ??= [element]
        commits[element["creator_id"]] = [...commits[element["creator_id"]], element]
    });
    
    let users = []
    raw_users.forEach((element:any) => {
        users = users.concat({"user": element, "commits": commits[element["userID"]]})
    })
    
    return {
        commits: commits,
        users: users,
        systemInfo: sysinfo
    }
};
