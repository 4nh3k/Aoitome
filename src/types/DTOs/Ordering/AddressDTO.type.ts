export interface AddressDTO{
  id: number;
  street: string;
  ward?: string;
  district?: string;
  city?: string;
  country?: string;
  zipCode?: string;
  buyerId?: string;
}