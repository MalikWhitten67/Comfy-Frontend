/* @refresh reload */
import { render } from 'solid-js/web';
import 'solid-devtools'; 
import { Router, Route } from "@solidjs/router";
import main from "../app/index.jsx";
import Product from "../app/products"
import cart from "../app/cart"
import Login from "../app/auth/login"
import Register from "../app/auth/register"
import Favorites from "../app/favorites"
import Orders from "../app/member/orders"
import About from "../app/about"
import Settings from "../app/member/settings/index.jsx"
import Help from "../app/help"
const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
    () => (
        <Router>
          <Route path="/" component={main} />
          <Route path="/products/:id" component={Product} />
          <Route path="/cart" component={cart} />
          <Route path="/auth/login" component={Login} />
          <Route path={"/auth/register"} component={Register} />
          <Route path={"/favorites"} component={Favorites} />
          <Route path={"/member/orders"} component={Orders} />
          <Route path={"/about"} component={About} />
          <Route path={"/member/settings"} component={Settings} />
          <Route path={"/help"} component={Help} />
        </Router>
    ),
    root!,
);
