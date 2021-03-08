function devour(id) {
  console.log('This is id of the burger:', id);
  const response = await fetch( `/burger/${id}`, {}, )
};