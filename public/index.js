function callUrl( url, method='get' ){
  // post requires header, method + data to be sent
  const postData = { 
      headers: { 'Content-Type': 'application/json' },
      method
  }
  return fetch( url,postData ).then( res=>res.json() )
}

function devour(id) {
  console.log('This is id of the burger:', id);
  const response = await callUrl( `/burger/${id}`, {id}, newNote )
  if( response.message ) alert( response.message )
};