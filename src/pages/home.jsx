import Caro from "../components/caro"
import Events from "./events"

function Home({ products,search }) {
    return (
        <>
            <Caro />
            <Events 
            products={products}
            search={search} />
        </>
    )
}
export default Home



