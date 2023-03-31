
export const load: PageLoad = async ({fetch}) => {
    return {
        commits:[
            {
                id: '1',
                author: 'John Doe',
                datum: '2020-01-01',
                lines_added: 10,
                lines_removed: 5,
                description: 'Added a new feature'
            }
        ],
        users:[
            {
                id: '1',
                name: 'John',
                surname: 'Doe',
                nickname: 'johndoe',
                avatar_url: 'https://avatars0.githubusercontent.com/u/1?v=4',
            }
        ],
        systemInfo:{
            boot_time: '2020-01-01',
            cpu_load: 0.5,
            ram: 8,
            platform: 'linux',
            disk_usage: 0.5,
        }
    }
};