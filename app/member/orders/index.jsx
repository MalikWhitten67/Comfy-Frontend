import SharedComponent from "../../../src/Components/SharedComponent";
import { Match, Switch, useEffect } from "vaderjs";
import api from "../../../src/api";
export default function () {
    let [orders, setOrders] = useState([])
    let [loading, setLoading] = useState(true)
    useEffect(() => {
        if (isServer) return;
        if (api.authStore.isValid === false) {
            window.location.href = '/auth/login'
        }

        api.collection('orders').getFullList({
            batch: Number.MAX_SAFE_INTEGER,
            'filter': `for="${api.authStore.record.id}"`
        })
            .then((data) => {
                console.log(data)
                setOrders(data)
                setLoading(false)
            })
    }, [])
    return (
        <SharedComponent title="Comfy - Member Orders">
            <div className="flex flex-col items-center justify-center mx-auto mt-5 bg-white">
                <h1>Orders</h1>
                <div className="flex flex-wrap mx-4">
                    <Switch>

                        <Match when={loading}>
                            <span className="spinner spinner-lg"></span>
                        </Match>
                        <Match when={orders.length === 0}>
                            <span className="text-muted-foreground">No orders found</span>
                        </Match>
                        <Match when={orders.length > 0}>
                            <div>
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
                        </Match>
                    </Switch>
                </div>
            </div>
        </SharedComponent>
    )
}
