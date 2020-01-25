const axios= require('axios');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');

const {GraphQLInputObjectType,GraphQLSchema,GraphQLObjectType, GraphQLInt,GraphQLBoolean, GraphQLString,GraphQLList}= require('graphql');

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


const Coins_Markets= new GraphQLObjectType({
    name:'coin_market',
    fields:()=>({
        
        id: {type: GraphQLString},
        symbol: {type: GraphQLString},
        name:{type: GraphQLString},
        image:{type: GraphQLString},
        current_price: {type: GraphQLInt},
        market_cap: {type: GraphQLInt},
        market_cap_rank: {type: GraphQLInt}

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