import { Link, redirect, useLoaderData } from "remix";

export async function action({ params }) {
     await fetch(`http://localhost:8000/products/${params.id}`, {method: 'DELETE'});
     return redirect('/products/');
}

export async function loader({params}) {
    const { id } = params;
    return await fetch(`http://localhost:8000/products/${id}`);
}

export default function product() {
    const product = useLoaderData();
    console.log(product);

    return (<>
        <Link to="/products">Back</Link>
        <h4>{product.title}</h4>
        <li>{product.description}</li>
    </>);
}
