// services/productsService.ts
import { api } from './apiClient';
import { API_CONFIG } from '@/config/api.config';

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string[];
  min_price?: number;
  max_price?: number;
  stock_status?: 'in-stock' | 'low-stock' | 'out-of-stock';
  sort_by?: 'name' | 'selling_price' | 'stock' | 'created_at';
  sort_order?: 'ASC' | 'DESC';
}

export interface Product {
  id?: number;
  name: string;
  code: number;
  purchase_price?: number;
  selling_price: number;
  stock: number;
  category: {
    category_name: string;
  };
}

export interface NewProductDto {
    name: string;
    code: number;
    purchase_price?: number;
    selling_price: number;
    category: string;
    stock: number;
}

export interface PaginatedProducts {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export class ProductsService {
  static async getProducts(
    filters: ProductFilters = {}
  ): Promise<PaginatedProducts> {
    // 1. Construir query params
    const params = new URLSearchParams();

    // Paginación
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    // Búsqueda
    if (filters.search) params.append('search', filters.search);

    // Categorías (array)
    if (filters.categories && filters.categories.length > 0) {
      filters.categories.forEach(cat => {
        params.append('categories', cat);
      });
    }

    // Precios
    if (filters.min_price !== undefined) {
      params.append('min_price', filters.min_price.toString());
    }
    if (filters.max_price !== undefined) {
      params.append('max_price', filters.max_price.toString());
    }

    // Stock
    if (filters.stock_status) {
      params.append('stock_status', filters.stock_status);
    }

    // Ordenamiento
    if (filters.sort_by) params.append('sort_by', filters.sort_by);
    if (filters.sort_order) params.append('sort_order', filters.sort_order);

    // 2. Hacer petición
    const queryString = params.toString();
    const url = `${API_CONFIG.ENDPOINTS.PRODUCTS.LIST}${queryString ? `?${queryString}` : ''}`;

    const response = await api.get<PaginatedProducts>(url);
    return response.data;
  }

  static async searchProducts(searchTerm: string): Promise<Product[]> {
    const result = await this.getProducts({ search: searchTerm, limit: 10 });
    return result.data;
  }

  static async createProductDto(newProductDto: NewProductDto): Promise<NewProductDto> {
    try {
    const response = await api.post<NewProductDto>(API_CONFIG.ENDPOINTS.PRODUCTS.CREATE, newProductDto);
    return response.data; 
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async getCategories(): Promise<string[]> {
    const response = await api.get<string[]>(API_CONFIG.ENDPOINTS.CATEGORIES.LIST);
    return response.data;
  }
}