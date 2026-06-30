import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Naavs from './components/Navvs';
import Footer from './components/Footer';
import planning from './assets/images/planning.webp'
import music from './assets/images/music.avif'
import engagement from './assets/images/engagment.jpeg'
import corporate from './assets/images/corporate.webp'
import college from './assets/images/college.jpg'
import birthday from './assets/images/birthday.webp'
import Home from './pages/home';
import Events from './pages/events';
import EventDetails from './pages/event-details';
import { useEffect, useState } from 'react';
import Booking from './pages/Wrong403';
import Login from './pages/login';
import Register from './pages/register';
import { ToastContainer } from "react-toastify"
import AddProduct from './admin/addProduct';
import ListProducts from './admin/ListProducts';
import EditProduct from './admin/EditProduct';
import ProtectedRoute from './utilis/ProtectedRoute';
import ListUsers from './admin/ListUsers';
import EditUser from './admin/EditUser';
import Cart from './pages/Cart';
import Wrong from './pages/Wrong403';
import axios from "axios";


function App() {

    // const events = [
    //     {
    //         id: 1,
    //         name: 'Wedding Planning',
    //         description:
    //             'Elegant wedding planning services with venue decoration, catering, photography, and entertainment.',
    //         price: 50000,
    //         image: planning
    //     },

    //     {
    //         id: 2,
    //         name: 'Corporate Events',
    //         description:
    //             'Professional corporate event management for conferences, seminars, product launches, and business meetings.',
    //         price: 35000,
    //         image: corporate
    //     },

    //     {
    //         id: 3,
    //         name: 'Birthday Celebrations',
    //         description:
    //             'Creative birthday party arrangements with themed decorations, games, music, and catering services.',
    //         price: 15000,
    //         image: birthday
    //     },

    //     {
    //         id: 4,
    //         name: 'Engagement Ceremony',
    //         description:
    //             'Memorable engagement event planning with customized décor, lighting, and entertainment options.',
    //         price: 25000,
    //         image: engagement
    //     },

    //     {
    //         id: 5,
    //         name: 'Music Concerts',
    //         description:
    //             'Complete concert management including stage setup, sound systems, lighting, and crowd coordination.',
    //         price: 75000,
    //         image: music
    //     },

    //     {
    //         id: 6,
    //         name: 'College Fest',
    //         description:
    //             'Exciting college festival management featuring cultural programs, competitions, and celebrity appearances.',
    //         price: 60000,
    //         image: college

    //     }]
const [cart, setCart] = useState(0)

const [products,setProducts]=useState([])

const [search,setSearch]=useState("")

    useEffect(()=>{
        const fetchProducts = async ()=>{
            try{
                const {data} = await axios.get(
                    "https://dummyjson.com/products"
                );
                console.log(data);
                setProducts(data.products)

                
            }catch(error){
                console.log("error------>",error);
                
            }
        };
        fetchProducts()
    },[]);

    return (
        <>
            <BrowserRouter>
                <Naavs cart={cart}
                search={search}
                setSearch={setSearch} />
                <ToastContainer position='top-right' autoClose={2000} />
                <Routes>
                    <Route path='/' element={<Home products={products} search={search} />} />
                    <Route path='/events' element={<Events products={products} search={search} />} />
                    <Route path='/Event-Details/:id' element={<EventDetails
                        products={products}
                    />} />
                    <Route path='/403' element={<Wrong />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />


                    <Route path='/admin/add-product' element={<ProtectedRoute requiredRole={["admin", "seller", "user"]} >
                        <AddProduct />
                    </ProtectedRoute>} />
                    <Route path='/admin/list-products' element={<ProtectedRoute >
                        <ListProducts />
                    </ProtectedRoute>} />

                     <Route path='/cart' element={<Cart />} />

                    <Route path='/admin/edit-product/:id' element={<EditProduct />} />

                    <Route path='/admin/list-users' element={<ProtectedRoute requiredRole={["admin"]} >
                        <ListUsers />
                    </ProtectedRoute>} />

                    <Route path='/admin/edit-user/:id' element={<ProtectedRoute requiredRole={["admin"]} >
                        <EditUser/>
                    </ProtectedRoute>} />

                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App







