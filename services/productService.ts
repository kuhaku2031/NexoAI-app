// services/productsService.ts
import { api } from './apiClient';
import { API_CONFIG } from '@/config/api.config';

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  stockStatus?: 'in-stock' | 'low-stock' | 'out-of-stock';
  sortBy?: 'name' | 'selling_price' | 'stock' | 'created_at';
  sortOrder?: 'ASC' | 'DESC';
}

export interface Product {
  id: number;
  name: string;
  code: number;
  selling_price: number;
  stock: number;
  category: {
    category_name: string;
  };
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
  /**
   * Obtener productos con filtros
   */
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
    if (filters.minPrice !== undefined) {
      params.append('minPrice', filters.minPrice.toString());
    }
    if (filters.maxPrice !== undefined) {
      params.append('maxPrice', filters.maxPrice.toString());
    }

    // Stock
    if (filters.stockStatus) {
      params.append('stockStatus', filters.stockStatus);
    }

    // Ordenamiento
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

    // 2. Hacer petición
    const queryString = params.toString();
    const url = `${API_CONFIG.ENDPOINTS.PRODUCTS.LIST}${queryString ? `?${queryString}` : ''}`;

    const response = await api.get<PaginatedProducts>(url);
    return response.data;
  }

  /**
   * Búsqueda rápida (sin filtros complejos)
   */
  static async searchProducts(searchTerm: string): Promise<Product[]> {
    const result = await this.getProducts({ search: searchTerm, limit: 10 });
    return result.data;
  }
}