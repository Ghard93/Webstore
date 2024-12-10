import httpCommon from "./http-common";

class ProductDataServices {

    getProducts(category) {
        return httpCommon.get(`/products/${category}`);
    }

    getProduct(product) {
        return httpCommon.get(`/products/product?product=${product}`);
    }
}

const productService = new ProductDataServices();
export default productService;