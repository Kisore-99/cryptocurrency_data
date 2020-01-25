const axios= require('axios');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');

const {GraphQLInputObjectType,GraphQLSchema,GraphQLObjectType, GraphQLInt,GraphQLBoolean, GraphQLString,GraphQLList, GraphQLFloat,GraphQLScalarType}= require('graphql');
const BigInt = require('graphql-bigint')
var vs_cur=''
var id= ''


const Coins_Fetch= new GraphQLObjectType({
    name:'coins',
    fields:()=>({
        
        id: {type: GraphQLString},
        symbol: {type: GraphQLString},
        name:{type: GraphQLString}

     })
});

const Coins_Price= new GraphQLObjectType({
    name:'coin_price',
    fields:()=>({
        
        data: {type: GraphQLJSON},
        

     })
});

const Coins_Markets= new GraphQLObjectType({
    name:'coin_market',
    fields:()=>({
        
        id: {type: GraphQLString},
        symbol: {type: GraphQLString},
        name:{type: GraphQLString},
        image:{type: GraphQLString},
        current_price: {type: GraphQLFloat},
        market_cap: {type: BigInt},
        market_cap_rank: {type: GraphQLInt},
        image: {type: GraphQLJSON},
       

     })
});



//Root Query
const RootQuery= new GraphQLObjectType({
    name: 'RootQueryType',
        fields: {
            
            coins:{
                type: new GraphQLList(Coins_Fetch),
            
                    resolve(parent,args){
                        return axios.get('https://api.coingecko.com/api/v3/coins/list')    
                        .then(res=>res.data);   
                    }

                },


                coin_price:{
                    type: Coins_Price,
                    args: {
                        vs_cur: {type:GraphQLString},
                        id: {type:GraphQLString}
                    },
                
                        resolve(parent,args){
                            return axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${args.id}&vs_currencies=${args.vs_cur}`)    
                            res1=res.data.args.id
                            .then(res1);   
                        }
    
                    },
    

   
                coin_market:{
                    type: new GraphQLList(Coins_Markets),
                    args: {
                        vs_cur: {type:GraphQLString},
                        id: {type:GraphQLString}
                    },
                    resolve(parent,args){
                        return axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${args.vs_cur}&ids=${args.id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)    
                        .then(res=>res.data);   
                    }

                },

            }
  });

module.exports= new GraphQLSchema({
    query: RootQuery
})