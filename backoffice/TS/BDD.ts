export const BDD:{[key: string] : {}[]}

= {


    categories : [
        
                {
                    id: 1,
                    name : "rouge"

                },

                {
                    id: 2,
                    name : "rose"

                },
                {
                    id: 3,
                    name : "blanc"

                },
            ],
        
    products : [

        {
            id: 1,
            name : "bordeaux",
            categoryId : 1

        },

        {
            id: 2,
            name : "rivesaltes",
            categoryId : 3

        },
        {
            id: 3,
            name : "rose",
            categoryId : 2

        }
    ],


    vendors : [
        
                {
                    id: 1,
                    name : "Paul",
                    products : [1, 2]
                    
        
                },
        
                {
                    id: 2,
                    name : "jeremy",
                    products : [2]
        
                },

                {
                    id: 3,
                    name : "stephane",
                    products : [1, 3]
        
                }
            ]


}




