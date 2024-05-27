export interface UpdateCatalogDTO{
  id: string;
  name?: string;
  catalogSlug?: string;
  image: string;
  description: string;
  state: number;
}