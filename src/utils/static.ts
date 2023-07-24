export const dataSources = ['Atlan Dev', 'Atlan Prod']

export const initList = [{
    name: 'Get Orders',
    query: `SELECT * 
FROM orders 
WHERE AGE > 18;
`,
    loadFile: './json/orders.json'
},
{
    name: 'Some Details',
    query: `SELECT * 
FROM some_details 
WHERE AGE > 18;
`,
    loadFile: './json/products.json'
},

{
    name: 'Custom Query',
    query: `type your test query...`,
    loadFile: './json/customers.json'
}]

export const userProfileData = [{
    active:  true,
    url: '/assets/user.png'
},{
    active:  false,
    url: '/assets/other-user.png'
}]

export const logoPath = '/dataQ-2.svg'

export const chatData = [
    {
        date: '23-07-2023',
        messages: [
            {
                user: 'someuser',
                img: '/assets/other-user.png',
                message: ['some question']
            },
            {
                user: 'me',
                img: '/assets/user.png',
                message: ['yeah']
            }
        ]
    },
    {
        date: 'today',
        messages: [
            {
                user: 'someuser',
                img: '/assets/other-user.png',
                message: ['some other important question']
            },
            {
                user: 'me',
                img: '/assets/user.png',
                message: ['reply']
            }
        ]
    },

]