function devour(id) {
  console.log('This is id of the burger:', id);
  const fetchOptions = {
    method='get',
    headers: { 'Content-Type': 'application/json' },			
}
  return fetch(`/burger/${id}`, fetchOptions);
};