import {gql} from 'apollo-boost';

const search = gql`
query($searchTerm:String)
  {    
    search(searchTerm:$searchTerm){
      rest_name,
      email,
      password,
      zip,
      location,
      timings,
      takeout,
      dineout,
      description,
      hood,
      address
    }
  }
`;

const getDishes = gql`
query($rest_id:String)
{
  getDishes(rest_id:$rest_id){
    rest_id,
    dish_name,
    ingredients,
    dish_price,
    description,
    dish_type,
  }
}`;

const getOrders = gql`
query($type:String, $id:String){
  getOrders(type:$type, id:$id){
   status,
    mode,
    user_name,
    dishes{
      dishes
    },
    order_id
  }
}
`;

const getReviews = gql`
query($type:String, $id:String){
  getReviews(type:$type, id:$id){
    rest_id,
    user_id,
    rating,
    rest_name,
    user_name
  }
}
`;

const getRestaurants = gql`
  getRestaurants{
    rest_name,
    email,
    zip,
    location,
    timings,
    delivery,
    dineout,
    takeout,
    description,
    hood,
    address
  }
`;

const getRestData = gql`
  query($id:String){
    getRestData(id:$id){
      rest_name,
      email,
      zip,
      location,
      timings,
      delivery,
      dineout,
      takeout,
      description,
      hood,
      address
    } 
  }
`;

const getUserData = gql`
  query($id:String){
    getUserData(id:$id){
      first_name,
      last_name,
      email,
      zip,
      birthdate,
      phone,
      sex,
      nickname,
      headline,
      ilove,
      city,
      state,
      country
    } 
  }
`;

export {search, getDishes, getOrders, getReviews, getRestaurants, getRestData, getUserData};