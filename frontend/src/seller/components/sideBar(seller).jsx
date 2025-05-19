import { Link } from "react-router-dom";

const SideBar = ({ sellerid }) => {
    console.log(sellerid);
    const name = "himasha"
    return ( 
        <aside className="col-span-2 bg-white h-screen shadow-xl px-3 w-60 overflow-x-hidden">
            <div className="space-y-6 mt-10">
                <h1 className="hidden md:block font-bold text-xl text-center text-green-600">My App</h1>
                <div id="profile" className="space-y-3 text-center">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/10492/10492200.png"
                        alt="User Avatar"
                        className="w-16 rounded-full mx-auto"
                    />
                    <h2 className="font-medium text-sm text-green-500">{name}</h2>
                    <p className="text-xs text-gray-500">Retail seller</p>
                </div>
                <div id="menu" className="flex flex-col space-y-2">
                    <Link
                        to={`/seller/${sellerid}/home`}
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white rounded-md transition duration-150 ease-in-out"
                    >
                        Homepage
                    </Link>
                    <Link
                        to={`/seller/${sellerid}/Inventroy`}
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white rounded-md transition duration-150 ease-in-out"
                    >
                        Inventory
                    </Link>
                    <Link
                        to={`/seller/${sellerid}/bulkOrders`}
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white rounded-md transition duration-150 ease-in-out"
                    >
                        Bulk Orders
                    </Link>
                    <Link
                        to={`/seller/${sellerid}/normalOrders`}
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white rounded-md transition duration-150 ease-in-out"
                    >
                        Normal Orders
                    </Link>
                    <Link
                        to={`/seller/${sellerid}/stat`}
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white rounded-md transition duration-150 ease-in-out"
                    >
                        Stats
                    </Link>
                    <Link
                        to={`/seller/${sellerid}/farmers`}
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white rounded-md transition duration-150 ease-in-out"
                    >
                        Farmers
                    </Link>
                    <Link
                        to={`/seller/${sellerid}/news`}
                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-green-500 hover:text-white rounded-md transition duration-150 ease-in-out"
                    >
                        News
                    </Link>
                </div>
            </div>
        </aside>
    );
}

export default SideBar;
