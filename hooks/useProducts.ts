import { NewProductDto, ProductsService } from "@/services/productService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProducts() {
  const products = useQuery({
    queryKey: ["products"],
    queryFn: async () => await ProductsService.getProducts(),

    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });

  return products;
}

export const CreateProduct = () => {
  const QueryClient = useQueryClient();

  const CreateProductMutation = useMutation({
    mutationFn: async (product: NewProductDto): Promise<NewProductDto> => {
      return await ProductsService.createProductDto(product);
    },
    onSuccess: () => {
      console.log('Product created successfully');
      QueryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError: (error) => {
      console.error('CreateProduct mutation error:', error);
    }
  });
  return CreateProductMutation;
}
