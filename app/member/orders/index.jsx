import SharedComponent from "../../../src/Components/SharedComponent";
import { Match, useEffect, Switch } from "vaderjs";
import api from "../../../src/api";

export default function() {
    let [orders, setOrders] = useState([]);
    let [loading, setLoading] = useState(true);

    useEffect(async () => { 
        // Ensure the code only runs on the client-side
        if (isServer) return;

        // Redirect if not authenticated
        if (api.authStore.isValid === false) {
            window.location.href = '/auth/login';
            return;
        }

        let orders = await api.collection('orders').getFullList({
            batch: Number.MAX_SAFE_INTEGER, 
            filter: `for="${api.authStore.record.id}"`,
        });

        setOrders(orders);
        setLoading(false);
         
    }, []);

    console.log("Loading state:", loading, orders); // Debugging loading state

    return (
        <SharedComponent title="Comfy - Member Orders">
            <div className="container lg:mx-12 lg:p-5">
                <h1>Orders</h1>
                <Switch key={loading}> 
                    <Match when={loading}>
                        <div className="text-center">
                            <h3>Loading...</h3>
                        </div>
                    </Match>
                    <Match when={orders.length === 0}>
                        <div className="text-center">
                            <h3>No orders found</h3>
                        </div>
                    </Match>
                    <Match when={orders.length > 0}>
                        <div className="row">
                            {orders.map((order) => {
                                return (
                                    <div className="col-md-4" key={order.id}>
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">Order #{order.id}</h5>
                                                <div className="lg:flex gap-4">
                                                    {order.products.map((product) => {
                                                        return (
                                                            <img 
                                                                key={product.id} 
                                                                src={product.mainImage} 
                                                                alt={product.name} 
                                                                className="w-20 h-20" 
                                                            />
                                                        );
                                                    })}
                                                </div>
                                                <p className="card-text">Total: ${order.total}</p>
                                                <p className="card-text">Status: {order.status}</p> 
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Match>
                </Switch>
            </div>
        </SharedComponent>
    );
}
