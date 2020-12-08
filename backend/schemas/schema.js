const{
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,  
} = require('graphql');
const util = require('util');
var bcrypt = require('bcrypt');
//imports for Models
var {rest_details} = require('../Models/RestDetails');
var {reviews} = require('../Models/ReviewModel');
var {user_details} = require('../Models/UserDetails');
var {order_details} = require('../Models/OrderModel');
var {dish_details} = require('../Models/DishDetails');
var {cart} = require('../Models/CartModel');
//setup promises for mongo functions
// const findRestaurants = util.promisify(rest_details.find).bind(rest_details);

//definition for userTypes
const uType_user = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    first_name:{
      type:GraphQLString
    },
    last_name:{
      type:GraphQLString
    },
    email:{
      type:GraphQLString
    },
    password:{
      type:GraphQLString
    },
    first_name:{
      type:GraphQLString
    },
    zip:{
      type:GraphQLString
    },
    birthdate:{
      type:GraphQLString
    },
    phone:{
      type:GraphQLString
    },
    sex:{
      type:GraphQLString
    },
    nickname:{
      type:GraphQLString
    },
    headline:{
      type:GraphQLString
    },
    ilove:{
      type:GraphQLString
    },
    findmein:{
      type:GraphQLString
    },
    hometown:{
      type:GraphQLString
    },
    blog:{
      type:GraphQLString
    },
    whennotyelping:{
      type:GraphQLString
    },
    whyredreview:{
      type:GraphQLString
    },
    favwebsite:{
      type:GraphQLString
    },
    book:{
      type:GraphQLString
    },
    concert:{
      type:GraphQLString
    },
    movie:{
      type:GraphQLString
    },
    lastmeal:{
      type:GraphQLString
    },
    dontell:{
      type:GraphQLString
    },
    discovery:{
      type:GraphQLString
    },
    crush:{
      type:GraphQLString
    },
    path:{
      type:GraphQLString
    },
    city:{
      type:GraphQLString
    },
    country:{
      type:GraphQLString
    },
    state:{
      type:GraphQLString
    },
    address:{
      type:GraphQLString
    },
    latitude:{
      type:GraphQLString
    },
    longitude:{
      type:GraphQLString
    },
    yelping_since:{
      type:GraphQLString
    },
  })
});

const uType_reviews = new GraphQLObjectType({
  name: 'Review',
  fields: () => ({
    rest_id:{
      type:GraphQLString
    },
    user_id:{
      type:GraphQLString
    },
    rating:{
      type:GraphQLInt
    },
    review:{
      type:GraphQLString
    },
    rest_name:{
      type:GraphQLString
    },
    user_name:{
      type:GraphQLString
    },
  })
})

const uType_dish_data = new GraphQLObjectType({
  name:'Dish_Data',
  fields: () => ({
    dishes:{
      type:GraphQLString
    }
  })
})

const uType_order_data = new GraphQLObjectType({
  name:'order_data',
  fields:{
    dish_id:{
      type:GraphQLString
    },
    quantity:{
      type:GraphQLInt
    },
  }
})

const uType_orders = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    status:{
      type:GraphQLString
    },
    order_id:{
      type:GraphQLString
    },
    mode:{
      type:GraphQLString
    },
    total:{
      type:GraphQLString
    },
    rest_name:{
      type:GraphQLString
    },
    user_name:{
      type:GraphQLString
    },
    city:{
      type:GraphQLString
    },
    country:{
      type:GraphQLString
    },
    state:{
      type:GraphQLString
    },
    ilove:{
      type:GraphQLString
    },
    dishes:{
      type: new GraphQLList(uType_dish_data)
    }
  })
})

const uType_dishes = new GraphQLObjectType({
  name: 'Dish',
  fields: () => ({
    rest_id:{
      type:GraphQLString
    },
    dish_name:{
      type:GraphQLString
    },
    ingredients:{
      type:GraphQLString
    },
    dish_price:{
      type:GraphQLInt
    },
    description:{
      type:GraphQLString
    },
    dish_type:{
      type:GraphQLString
    },
    dish_path:{
      type:GraphQLString
    }
  })
})

const uType_restaurant = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
      rest_name:{
        type:GraphQLString
      },
      email:{
        type:GraphQLString
      },
      password:{
        type:GraphQLString
      },
      zip:{
        type:GraphQLString
      },
      location:{
        type:GraphQLString
      },
      timings:{
        type:GraphQLString
      },
      delivery:{
        type:GraphQLBoolean
      },
      takeout:{
        type:GraphQLBoolean
      },
      dineout:{
        type:GraphQLBoolean
      },
      description:{
        type:GraphQLString
      },
      hood:{
        type:GraphQLString
      },
      address:{
        type:GraphQLString
      },
      latitude:{
        type:GraphQLString
      },
      longitude:{
        type:GraphQLString
      },
      path1:{
        type:GraphQLString
      },
      path2:{
        type:GraphQLString
      },
      path3:{
        type:GraphQLString
      },
      path4:{
        type:GraphQLString
      }
    })
})

//definition for queryTypes
const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields:{
    search:{
      type:new GraphQLList(uType_restaurant),
      args:{
        searchTerm:{type:GraphQLString}
      },
      resolve:(parentValue, args) => {
        return rest_details.find({rest_name: new RegExp(args.searchTerm, 'i')}).exec();
      }
    },
    getUserData:{
      type:new GraphQLList(uType_user),
      args:{
        id:{type:GraphQLString}
      },
      resolve:(parentValue, args) => {
        return user_details.find({_id:args.id}).exec();
      }
    },
    getRestData:{
      type:new GraphQLList(uType_restaurant),
      args:{
        id:{type:GraphQLString}
      },
      resolve:(parentValue, args) => {
        return rest_details.find({_id:args.id}).exec();
      }
    },
    getDishes:{
      type:new GraphQLList(uType_dishes),
      args:{
        rest_id:{type:GraphQLString}
      },
      resolve:(parentValue, args) => {
        return dish_details.find({rest_id:args.rest_id}).exec();
      }
    },
    getRestaurants:{
      type:new GraphQLList(uType_restaurant),
      resolve:() => {
        return rest_details.find().exec();
      }
    },
    getReviews:{
      type: new GraphQLList(uType_reviews),
      args:{
        type:{type:GraphQLString},
        id:{type:GraphQLString}
      },
      resolve: async (parentValue, args) => {
        let searchCriteria;

        if(args.type === "user"){
          searchCriteria = {user_id:args.id}
        }
        else if(args.type === "rest"){
          searchCriteria = {rest_id:args.id}
        }

        const result = await reviews.find(searchCriteria);
        let ans = []

        if(result!=null){
          for(let i in result){
            if(args.type === "user"){
              const result2 = await rest_details.findOne({_id:result[i].rest_id}, {rest_name:1});
              if(result2!=null){
                ans.push({rest_name:result1.rest_name, ...result[i]._doc})
              }
            }
            else{
              const result2 = await user_details.findOne({_id:result[i].user_id}, {first_name:1, last_name:1})
              if(result2!=null){
                ans.push({user_name:result2.first_name+" "+result2.last_name, ...result[i]._doc})
              }
            }
          }
        }
        return ans;
      }
    },
    getOrders:{
      type: new GraphQLList(uType_orders),
      args:{
        type:{type:GraphQLString},
        id:{type:GraphQLString}
      },
      resolve: async (parentValue, args) => {        
        let searchCriteria;

        if(args.type === "user"){
          searchCriteria = {user_id:args.id}
        }
        else if(args.type === "rest"){
          searchCriteria = {rest_id:args.id}
        }

        const result = await order_details.find(searchCriteria);
        let ans = [];
        
        if(result!=null){
          for(let i in result){
            let dishes = [];
            let temp = {status:result[i].status, order_id:result[i]._id, mode:result[i].mode, total:result[i].total};
            if(args.type === "user"){
              const result2 = await rest_details.findOne({_id:result[i].rest_id}, {rest_name:1});
              if(result2!=null){
                temp = {...temp, rest_name:result2.rest_name}
              }
            }
            else{
              const result2 = await user_details.findOne({_id:result[i].user_id}, {first_name:1, ilove:1, last_name:1, city:1, country:1, state:1})
              if(result2!=null){
                temp = {...temp, user_name:result2.first_name+" "+ result2.last_name, city:result2.city, country:result2.country, state:result2.state, ilove:result2.ilove}
              }
            }
            for(let j in result[i].dishes){
              console.log(result[i].dishes[j])
              const result3 = await dish_details.findOne({_id:result[i].dishes[j].dish_id}, {dish_name:1})
              console.log(result3)
              dishes.push({dishes:result[i].dishes[j].quantity+" x "+result3.dish_name})
            }
            temp = {...temp, dishes}
            ans.push(temp)
          }
        }
        console.log(ans)
        return ans;
      }
    }
  }
})

const mutations = new GraphQLObjectType({
  name:'Mutation',
  fields: {
    //User Signup
    userSignup:{
      type:GraphQLString,
      args:{
        email:{type:GraphQLString},
        first_name:{type:GraphQLString},
        last_name:{type:GraphQLString},
        password:{type:GraphQLString},
        zip:{type:GraphQLString},
        birthdate:{type:GraphQLString},
        yelping_since:{type:GraphQLString}
      },
      resolve: async (parentValue, args) => {
        console.log(args)
        const result1 = await user_details.findOne({email:args.email})
        console.log(result1)
        if(result1==null){
          let hashedPassword = bcrypt.hashSync(args.password,10);
          let today = new Date();
          let user = {
            'first_name':args.first_name,
            'last_name':args.last_name,
            'email':args.email,
            'password':hashedPassword,
            // 'zip':args.zip,
            // 'birthdate':msg.birthdate,
            'yelping_since': today.getMonth()+"/"+today.getFullYear()
          };

          var new_user = user_details(user)
          const result2 = await new_user.save();
          console.log(result2)
          return "Signed up";
        }
        else{
          return "User already exists"
        }        
      }
    },    
    //User Login
    userLogin:{
      type:GraphQLString,
      args:{
        email:{type:GraphQLString},
        password:{type:GraphQLString},        
      },
      resolve: async (parentValue, args) => {
        console.log(args)
        const result1 = await user_details.findOne({email:args.email})
        console.log(result1)
        if(result1!=null){
          const result2 = await bcrypt.compare(args.password, result1.password)          
          if(result2){
            return "Login Successful"
          }
          else{
            throw new Error("bad credentials")
          }
        }
        else{
          throw new Error("User does not exist")
        }
      }
    },
    //Rest Signup
    restSignup:{
      type:GraphQLString,
      args:{
        email:{type:GraphQLString},
        rest_name:{type:GraphQLString},          
        password:{type:GraphQLString},
        zip:{type:GraphQLString},
        location:{type:GraphQLString}
      },
      resolve: async (parentValue, args) => {
        console.log(args)
        const result1 = await rest_details.findOne({email:args.email})
        console.log(result1)
        if(result1==null){
          let hashedPassword = bcrypt.hashSync(args.password,10);
          let today = new Date();
          let rest = {
            'rest_name':args.rest_name,
            'email':args.email, 
            'password':hashedPassword, 
            'zip':args.zip, 
            'location':args.location
          };

          var new_rest = rest_details(rest)
          const result2 = await new_rest.save();
          console.log(result2)
          return "Rest Signed up";
        }
        else{
          return "Rest already exists"
        }        
      }
    },
    //rest login
    restLogin:{
      type:GraphQLString,
      args:{
        email:{type:GraphQLString},
        password:{type:GraphQLString},        
      },
      resolve: async (parentValue, args) => {
        console.log(args)
        const result1 = await rest_details.findOne({email:args.email})
        console.log(result1)
        if(result1!=null){
          const result2 = await bcrypt.compare(args.password, result1.password)          
          if(result2){
            return "Login Successful"
          }
          else{
            throw new Error("bad credentials")
          }
        }
        else{
          throw new Error("User does not exist")
        }
      }
    },
    //update user details
    updateUserDetails:{
      type:GraphQLString,
      args:{
        id:{
          type:GraphQLString
        },
        first_name:{
          type:GraphQLString
        },
        last_name:{
          type:GraphQLString
        },
        birthdate:{
          type:GraphQLString
        },
        phone:{
          type:GraphQLString
        },
        sex:{
          type:GraphQLString
        },
        nickname:{
          type:GraphQLString
        },
        headline:{
          type:GraphQLString
        },
        ilove:{
          type:GraphQLString
        },
        findmein:{
          type:GraphQLString
        },
        hometown:{
          type:GraphQLString
        },
        blog:{
          type:GraphQLString
        },
        whennotyelping:{
          type:GraphQLString
        },
        whyredreview:{
          type:GraphQLString
        },
        favwebsite:{
          type:GraphQLString
        },
        book:{
          type:GraphQLString
        },
        concert:{
          type:GraphQLString
        },
        movie:{
          type:GraphQLString
        },
        lastmeal:{
          type:GraphQLString
        },
        dontell:{
          type:GraphQLString
        },
        discovery:{
          type:GraphQLString
        },
        crush:{
          type:GraphQLString
        },
        path:{
          type:GraphQLString
        },
        city:{
          type:GraphQLString
        },
        country:{
          type:GraphQLString
        },
        state:{
          type:GraphQLString
        },
        address:{
          type:GraphQLString
        },
      },
      resolve: async (parentValue, args) => {
        let id = args.id
        delete args.id
        const result = await user_details.updateOne({_id:id}, {$set:{...args}})
        if(result.nModified > 0){
          return "Updated"
        }
        else{
          throw new Error("No updates done")
        }
      }
    },
    //update rest details
    updateRestDetails:{
      type:GraphQLString,
      args:{
        id:{
          type:GraphQLString
        },
        rest_name:{
          type:GraphQLString
        },
        zip:{
          type:GraphQLString
        },
        location:{
          type:GraphQLString
        },
        timings:{
          type:GraphQLString
        },
        delivery:{
          type:GraphQLBoolean
        },
        takeout:{
          type:GraphQLBoolean
        },
        dineout:{
          type:GraphQLBoolean
        },
        description:{
          type:GraphQLString
        },
        hood:{
          type:GraphQLString
        },
        address:{
          type:GraphQLString
        },
      },
      resolve: async (parentValue, args) => {
        let id = args.id
        delete args.id
        const result = await rest_details.updateOne({_id:id}, {$set:{...args}})
        if(result.nModified > 0){
          return "Rest data Updated"
        }
        else{
          throw new Error("No updates done")
        }
      }
    },
    //addDish
    addDish:{
      type:GraphQLString,
      args:{
        rest_id:{
          type:GraphQLString
        },
        dish_name:{
          type:GraphQLString
        },
        ingredients:{
          type:GraphQLString
        },
        dish_price:{
          type:GraphQLInt
        },
        description:{
          type:GraphQLString
        },
        dish_type:{
          type:GraphQLString
        },
        dish_path:{
          type:GraphQLString
        }     
      },
      resolve: async (parentValue, args) => {
        var new_dish = dish_details(args)
        const result = await new_dish.save();
        if(result!=null){
          return "Dish Added"
        }
        return new Error("Some error occured")
      }
    },
    updateDish:{
      type:GraphQLString,
      args:{
        id:{
          type:GraphQLString
        },
        dish_name:{
          type:GraphQLString
        },
        ingredients:{
          type:GraphQLString
        },
        dish_price:{
          type:GraphQLInt
        },
        description:{
          type:GraphQLString
        },
        dish_type:{
          type:GraphQLString
        },
        dish_path:{
          type:GraphQLString
        }     
      },
      resolve: async (parentValue, args) => {
        let id = args.id
        delete args.id
        const result = await dish_details.updateOne({_id:id}, {$set:{...args}})
        if(result.nModified > 0){
          return "Dish Updated"
        }
        else{
          throw new Error("No updates done")
        }     
      }
    },
    //place order
    placeOrder:{
      type:GraphQLString,
      args:{
        rest_id:{
          type:GraphQLString
        },
        total:{
          type:GraphQLInt
        },
        mode:{
          type:GraphQLString
        },
        status:{
          type:GraphQLString
        },
        user_id:{
          type:GraphQLString
        },
      },
      resolve: async (placeOrder, args) => {
        var new_order = order_details(args)
        try{
          const result = new_order.save()
          if(result!=null){
            return "Order Placed"
          }
          else{
            return "No order placed"
          }
        }
        catch(e){
          console.log(e)
          throw new Error("Some error occured")
        }
      }
    },
    //add to cart
    addToCart:{
      type:GraphQLString,
      args:{
        dish_id:{
          type:GraphQLString
        },
        rest_id:{
          type:GraphQLString
        },
        count:{
          type:GraphQLInt
        },
        user_id:{
          type:GraphQLString
        },
      },
      resolve: async (parentValue, args) => {
        let cart_items = cart(args)
        let result = await cart_items.save();
        if(result!=null){
          return "Added to cart"
        }
        else{
          return "Can't be added"
        }
      }
    },
    //update order status
    updateOrderStatus:{
      type:GraphQLString,
      args:{
        id:{
          type:GraphQLString
        },
        status:{
          type:GraphQLString
        }
      },
      resolve: async (parentValue, args) => {
        const result = await order_details.updateOne({_id:args.id}, {$set:{status:args.status}})
        console.log(result)
        if(result.nModified > 0){
          return "Status updated"
        }
        else{
          throw new Error("Some error occured")
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query:RootQuery,
  mutation:mutations
});