import { LayoutGrid, Search, ShoppingBag, ShoppingBasket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import CartItemList from './CartItemList';
import { useNavigate } from 'react-router-dom';

const Header = ({custId}) => {
  const [products, setProducts] = useState(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const navigate = useNavigate();

  const handledashboard = () => {
    navigate(`/Customer/Dashboard/${custId}`);

   
  };

  const handleproductpage = () => {
    navigate(`/Customer/${custId}`);

   
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:3000/api/RetailSeller/products');
      const json = await response.json();

      if (response.ok) {
        setProducts(json);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => { // fetching cart count
      try {
        const response = await fetch('http://localhost:3000/api/customer/addtocart/cart/count'); // Changed the API endpoint
        if (response.ok) {
          const data = await response.json();
          setCartItemsCount(data.count); // set the cart count
        }
      } catch (error) {
        console.error('Error fetching cart count:', error); //  error message
      }
    };

    fetchCartCount(); //  function call

    // Refetching cart count every 5 seconds 
    const intervalId = setInterval(fetchCartCount, 5000); // matheesha updated, interval and function call

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-5 shadow-sm flex justify-between bg-gray-300">

      <div className="flex items-center gap-8">
        <img src="/customer_images/Our_logo.png" alt="Logo" width={90} height={90} />

        <h2 className="text-3xl font-bold text-green-900 hidden md:flex">GREEN ROOTS ! From Farm to Your Table ... </h2>

        <img src="/customer_images/Our_logo.png" alt="Logo" width={90} height={90} />

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
              <LayoutGrid className="h-5 w-5" />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <DropdownMenuItem key={product._id}>
                  <img src={product.image} alt={product.status} className="w-10 h-10" />
                  <h2>{product.status}</h2>
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu> */}

        {/* <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div> */}
      </div>
      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 items-center text-lg">
              <ShoppingBasket className="h-7 w-7 cursor-pointer" />
              <span className="bg-green-600 text-white px-2 rounded-full">{cartItemsCount}</span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-green-500 text-white font-bold text-lg p-2">My Cart</SheetTitle>
              <SheetDescription>
                <CartItemList custId={custId}/>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Button onClick={handledashboard}>Explore</Button>
        <Button onClick={handleproductpage}>Products</Button>
      </div>
    </div>
  );
};

export default Header;