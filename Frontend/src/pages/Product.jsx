import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      console.log(productData);
      setImage(product.image[0]);
    }
  }, [productId, products]);
 

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex flex-1 flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
              onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto"/>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3"/>
            <img src={assets.star_icon} alt="" className="w-3"/>
            <img src={assets.star_icon} alt="" className="w-3"/>
            <img src={assets.star_icon} alt="" className="w-3"/>
            <img src={assets.star_dull_icon} alt="" className="w-3"/>
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select size</p>
            <div className="flex gap-2">
              {
                productData.sizes.map((item, index)=>(
                  <button onClick={()=>setSize(item)} className={` py-2 px-4 bg-gray-100 ${item===size ? 'border border-orange-400' : ''}`} key={index}>{item}</button>
                ))
              }
            </div>
          </div>
          <button onClick={()=> addToCart(productData._id, size)} className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5"/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original Product</p>
              <p> Cash on delivery is available</p>
              <p>Easy return and exchange policy</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero vel eius suscipit, nemo facilis aut quis. Ullam, ratione! Illum, in.</p>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam numquam voluptate minus dolor dolores qui laboriosam, nemo nesciunt, assumenda deserunt doloremque. Officia enim quia deserunt quam corrupti alias ipsa amet! Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime cupiditate neque nisi ducimus saepe. Labore atque eos maxime natus facilis temporibus, corrupti ipsam, iure sint officia similique eum minus blanditiis cum exercitationem praesentium facere earum architecto. Sit quibusdam ipsa vel, ab, sequi similique vitae esse a laudantium animi quos minus?</p>
        </div>
      </div>
      
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
