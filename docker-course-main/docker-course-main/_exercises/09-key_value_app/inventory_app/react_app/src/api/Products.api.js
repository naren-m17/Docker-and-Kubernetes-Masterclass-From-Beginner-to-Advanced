import axiosClient from "./AxiosClient";

export const getProduct = async () => {
    try{
        const response = await axiosClient.get("/product/");
        return response.data;
    } catch(err){
        console.log( "API error::", err );
    }
    return "API error";
};

export const createProduct = async (key, productData) => {
  try {
    console.log({key, ...productData} );
    const response = await axiosClient.post(`/product/`, { key, ...productData });
    return response.data;
  } catch (err) {
    console.log("API error::", err);
  }
  return "API error";
};


