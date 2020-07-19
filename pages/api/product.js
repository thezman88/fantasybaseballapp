import Product from "../../models/Product";
import Cart from '../../models/Cart'
import connectDb from "../../utils/connectDb"

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).send(`Method ${req.method} not allowed`); //error user side
      break;
  }
};

async function handleGetRequest(req, res) {
  const { _id } = req.query;
  const product = await Product.findOne({ _id });
  res.status(200).json(product);
}

async function handlePostRequest(req,res){
  const {name, price, description, mediaUrl} = req.body
  try{
    if(!name || !price || !description || !mediaUrl){
        return res.status(422).send("Product missing one or more fields")
    
      }
      const product = await new Product({
          name,
          price,
          description,
          mediaUrl
      }).save()
      res.status(201).json(product)
    } catch(error){
        
        res.status(500).send("server error creating product")
    }

  }
  

async function handleDeleteRequest(req, res) {
  const { _id } = req.query;
  try{
    await Product.findOneAndDelete({ _id });
    await Cart.updateMany(
      { "products.product": _id },
      { $pull: {products:{product: _id}} }

    )
    res.status(204).json({});

  }catch(error){
    console.error(error)
    res.status(500).send('Error deleting product')
  }
}

