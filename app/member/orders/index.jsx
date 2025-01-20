import SharedComponent from "../../../src/Components/SharedComponent";
import { useEffect } from "vaderjs";
import api from "../../../src/api";
export default function(){
    let [orders, setOrders] = useState([])
    useEffect(() => { 
        if(isServer) return;
        if(api.authStore.isValid === false){
            window.location.href = '/auth/login'
        }

        api.collection('orders').getFullList({
            batch: Number.MAX_SAFE_INTEGER,
            'filter': `for="${api.authStore.record.id}"`
        })
        .then((data) => {
            console.log(data)
            setOrders(data)
        })
    }, [])
    return (
        <SharedComponent title="Comfy - Member Orders">
            <div className="container">
                <h1>Orders</h1>
                <div className="row">
                    {orders.map((order) => {
                        return (
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Order #{order.id}</h5>
                                        <p className="card-text">Total: ${order.total / 100}</p>
                                        <p className="card-text">Status: {order.status}</p> 
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </SharedComponent>
    )
}