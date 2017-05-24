let rootURL = 'https://greenpoints-c1411.firebaseio.com/';

// exports.path = function(p){
//   let url = `${rootURL}${p}`;
//   console.log(url);
//   return fetch(url)
//     .then((resp)=>resp.json())
//     .then((json)=>{
//       return json.Path;
//     });
// }

exports.view = function(uid){
  let url = `${rootURL}users/${uid}/coupon.json?`;
  return fetch(url)
    .then((resp)=>resp.json());
}
