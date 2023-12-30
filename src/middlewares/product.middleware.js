export function productValidator(req, res, next) {
  
    if (req.body) {
      let {title, price} = req.body;
  
    if (!title){
      res.send({message:"title is required"});
      return
    }      
    if (!price){
      res.send({message:"price is required"});
      return
    }           
}
    next()
}