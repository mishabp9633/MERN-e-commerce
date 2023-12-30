export function productValidator(req, res, next) {
  
    if (req.body) {
      let {title, price, subcategoryId} = req.body;
  
    if (!title){
      res.send({message:"title is required"});
      return
    }      
    if (!price){
      res.send({message:"price is required"});
      return
    }      
    if (!subcategoryId){
      res.send({message:"subcategoryId is required"});
      return
    }      
}
    next()
}