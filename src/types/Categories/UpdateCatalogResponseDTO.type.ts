export interface UpdateCatalogResponseDTO{
  id: string;
  name?: string;
  catalogSlug?: string;
  image: string;
  description: string;
  state: number;
}