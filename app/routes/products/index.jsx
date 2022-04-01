import { useLoaderData, Link, Form  } from "remix";

export async function loader() {
    const res = await fetch("http://localhost:8000/products")
    return res.json();
}

export default function Products() {
    const products = useLoaderData();

    return (
    <>
        <h1>Products</h1>
        <h3><Link to="/products/new">New</Link></h3>
        <ul>
            {products.map(product => (<li key={product.id}>
                <Link to={`/products/${product.id}`}>{product.title}</Link>
                <Form method="POST" action={`/products/${product.id}`}>
                    <button type="submit">Delete</button>
                </Form>
            </li>))}
        </ul>
    </>);
}
