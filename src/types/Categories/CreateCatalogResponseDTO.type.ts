export interface CreateCatalogResponseDTO{
  id: string;
  name: string;
  parentId?: string;
  catalogSlug?: string;
  image: string;
  description: string;
  state: number;
}