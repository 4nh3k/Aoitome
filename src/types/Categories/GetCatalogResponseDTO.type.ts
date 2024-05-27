export interface GetCatalogResponseDTO{
  id: string;
  name: string;
  parentId?: string;
  catalogSlug?: string;
  description: string;
  image: string;
  state: number;
}