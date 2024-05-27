export interface CreateCatalogDTO{
  name: string;
  parentId?: string;
  catalogSlug?: string;
  image: string;
  description: string;
  state: number;
}