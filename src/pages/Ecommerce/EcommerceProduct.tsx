import { Link, useNavigate } from "react-router-dom";

interface ProductProps {
  id: number;
  title: string;
  imageURL: string;
  price: number;
  discount?: number;
  rating: number;
  totalRating: number;
  isAdmin?: boolean;
}

export function EcommerceProduct(props: ProductProps) {

  const navigate = useNavigate();

  const handleRedirect = () => {
    const defaultState = {
      id: 1,  // Default ID set to 1
      languageCode: 'en',  // Default language code
      averageRating: 0,  // Default average rating
      description: 'No description available',  // Default description
      numPages: 1,  // Default number of pages
      publicationDay: 1,  // Default publication day
      publicationMonth: 1,  // Default publication month
      publicationYear: 2023,  // Default publication year
      isbn13: '0000000000000',  // Default ISBN as a placeholder
      url: 'https://example.com',  // Default URL as a placeholder
      imageUrl: props.imageURL,  // Default image URL as a placeholder
      ratingsCount: 0,  // Default ratings count
      title: props.title,  // Default title
      titleWithoutSeries: props.title,  // Default title without series
      price: props.price,  // Default price
      availability: 1000,  // Default availability (e.g., in stock)
      dimensions: '1x1x1',  // Default dimensions as a placeholder
      discountPercentage: 0,  // Default discount percentage
      itemWeight: 1,  // Default item weight
      authorName: 'Unknown Author',  // Default author name
      formatId: 1,  // Default format ID
      formatName: 'Paperback',  // Default format name
      publisherId: 1,  // Default publisher ID set to 1
      publisherName: 'Unknown Publisher',  // Default publisher name
    };
  
    navigate('/product-detail', {
      state: defaultState
    });
  };

  return (
    <div
      className="w-52 p-4 h-fit bg-white 
    rounded-md border-none border-gray-200 flex-col justify-start items-center gap-2.5 hover:shadow-custom-lg hover:shadow-slate-300 inline-flex box-border font-sans"
    onClick={handleRedirect}
    >
      <img
        className="w-48 h-52 rounded-xl cursor-pointer object-cover	"
        src={props.imageURL}
      />
      <div className="px-2 h-full flex flex-col gap-1">
        <div className="line-clamp-2 cursor-pointer h-12 text-black text-md font-normal leading-normal">
          {props.title}
        </div>
        <div className="flex items-center gap-3">
          <div className=" text-[#ff424e] text-md font-bold leading-loose">
            {!props.discount
              ? props.price
              : (props.price * (1 - props.discount)).toFixed(2)}{" "}
            $
          </div>
          {props.discount && (
            <span className="text-black bg-gray-300 text-xs px-1 py-1 font-bold rounded-md">
              -{(props.discount * 100).toFixed(0)}%
            </span>
          )}
        </div>
        {props.discount && (
          <div className="text-black text-sm font-normal line-through leading-tight">
            {props.price.toLocaleString()} $
          </div>
        )}
        {!props.discount && <div className="h-4"></div>}
      </div>
      <div className="w-full text-sm text-gray-600 mx-2 border-t-1 py-2 ">
        Delivery at 6/11, Surgeous
      </div>
    </div>
  );
}
