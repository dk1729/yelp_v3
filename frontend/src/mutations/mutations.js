import { gql } from 'apollo-boost';

const userLogin = gql`
  mutation ($email: String, $password: String){
    userLogin(email:$email, password:$password)
  }
`;

const restLogin = gql`
  mutation ($email: String, $password: String){
    restLogin(email:$email, password:$password)
  }
`;

const restSignup = gql`
  mutation ($email: String, $password: String, $rest_name:String, $zip:String, $location:String){
    restSignup(email:$email, password:$password, rest_name:$rest_name, zip:$zip, location:$location)
  }
`;

const userSignup = gql`
  mutation ($email: String, $password: String, $rest_name:String, $zip:String, $location:String){
    userSignup(email:$email, password:$password, rest_name:$rest_name, zip:$zip, location:$location)
  }
`;

const updateUserData = gql`
  mutation ($id:String, $first_name:String, $last_name:String, $birthdate:String, $phone:String, $sex:String, $nickname:String, $headline:String, $ilove:String){
    updateUserData(id:$id, first_name:$first_name, last_name:$last_name, birthdate:$birthdate, phone:$phone, sex:$sex, nickname:$nickname, headline:$headline, ilove:$ilove)
  }
`;

const updateRestData = gql`
  mutation($id:String, $rest_name:String, $zip:String, $location:String, $timings:String){
    updateRestData(id:$id, rest_name:$rest_name, zip:$zip, location:$location, timings:$timings)
  }
`;

const addDish = gql`
  mutation($rest_id:String, $dish_name:String, $ingredients:String, $description:String, $dish_type:String){
    addDish(rest_id:$rest_id, dish_name:$dish_name, ingredients:$ingredients, description:$description, dish_type:$dish_type)
  }
`;

const updateDish = gql`
  mutation($id:String, $dish_name:String, $ingredients:String, $description:String, $dish_type:String){
    updateDish(id:$id, dish_name:$dish_name, ingredients:$ingredients, description:$description, dish_type:$dish_type)
  }
`;

const placeOrder = gql `
  mutation($rest_id: String,$total: Int,$mode: String,$status: String,$user_id: String){
    placeOrder( rest_id:$rest_id,total:$total,mode:$mode,status:$status,user_id:$user_id)
  }
`;

const addToCart = gql `
  mutation( $dish_id: String, $rest_id: String, $count: Int, $user_id: String){
    addToCart(dish_id:$dish_id, rest_id:$rest_id, count:$count, user_id:$user_id)
  }
`;

const updateOrderStatus = gql `
  mutation($id: String,$status: String){
    updateOrderStatus(id:$id,status:$status)
  }
`;

export {userLogin, restLogin, userSignup, restSignup, updateUserData, updateRestData, addDish, addToCart, updateDish, updateOrderStatus, placeOrder};