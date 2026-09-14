import { mockStore, MockProduct } from '../../database/mockStore.js';

export class ProductsService {
  static getProducts(businessId: string) {
    return mockStore.products.filter((p) => p.business_id === businessId || p.business_id === 'UMKM001');
  }

  static addProduct(businessId: string, input: Omit<MockProduct, 'product_id' | 'business_id'>) {
    const newProduct: MockProduct = {
      product_id: `PROD-${Date.now()}`,
      business_id: businessId,
      ...input,
    };
    mockStore.products.push(newProduct);
    return newProduct;
  }

  static updateProduct(productId: string, updateData: Partial<MockProduct>) {
    const product = mockStore.products.find((p) => p.product_id === productId);
    if (!product) {
      throw new Error('Produk tidak ditemukan');
    }
    Object.assign(product, updateData);
    return product;
  }

  static deleteProduct(productId: string) {
    const index = mockStore.products.findIndex((p) => p.product_id === productId);
    if (index === -1) {
      throw new Error('Produk tidak ditemukan');
    }
    mockStore.products.splice(index, 1);
    return { success: true };
  }
}
